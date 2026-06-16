using System.Net.Http;
using System.Text;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Pgvector;
using Pgvector.EntityFrameworkCore;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;
using PortfolioApp.Domain.Entities;
using PortfolioApp.Infrastructure.Data;

namespace PortfolioApp.Infrastructure.Services;

public class AgentService : IAgentService
{
    private readonly ApplicationDbContext _context;
    private readonly IEmbeddingService _embeddingService;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AgentService> _logger;
    private readonly HttpClient _ollamaClient;

    public AgentService(
        ApplicationDbContext context,
        IEmbeddingService embeddingService,
        IConfiguration configuration,
        ILogger<AgentService> logger,
        IHttpClientFactory httpClientFactory)
    {
        _context = context;
        _embeddingService = embeddingService;
        _configuration = configuration;
        _logger = logger;
        _ollamaClient = httpClientFactory.CreateClient("Ollama");
    }

    public async Task<AgentResponseDTO> AskAsync(string question, CancellationToken cancellationToken = default)
    {
        try
        {
            // 1. Generate embedding for the question
            var questionEmbedding = await _embeddingService.GenerateEmbeddingAsync(question, cancellationToken);
            var vector = new Vector(questionEmbedding);

            // 2. Find most relevant chunks using cosine similarity
            var relevantChunks = await _context.KnowledgeChunks
                .OrderBy(k => k.Embedding!.CosineDistance(vector))
                .Take(10)
                .ToListAsync(cancellationToken);

            if (!relevantChunks.Any())
            {
                return new AgentResponseDTO
                {
                    Success = false,
                    Answer = "I don't have enough information to answer that question yet."
                };
            }

            // 3. Build context from retrieved chunks
            var context = string.Join("\n\n", relevantChunks.Select(c => c.Content));

            // 4. Build prompt
            var systemPrompt = """
                You are a helpful assistant representing Dhiaeddine Zouaghi's professional portfolio.
                Answer questions about Dhia based ONLY on the provided context.
                
                IMPORTANT RULES:
                1. Be extremely concise - keep answers to 1-3 sentences max
                2. Do NOT explain what technologies do or their capabilities
                3. Do NOT go on tangents about frameworks, tools, or methodologies
                4. Only answer the specific question asked
                5. If context is insufficient, simply say so
                6. Use third person: "he/Dhia" not "I"
                
                Respond with ONLY the answer. No labels, no meta-commentary, no extra information.
                """;

            var userPrompt = $"""
                Context about Dhiaeddine Zouaghi:
                {context}

                Question: {question}
                """;

            // 5. Call Ollama chat API
            var answer = await CallOllamaAsync(systemPrompt, userPrompt, cancellationToken);

            return new AgentResponseDTO
            {
                Success = true,
                Answer = answer
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to process agent query: {Question}", question);
            return new AgentResponseDTO
            {
                Success = false,
                Error = "Something went wrong. Please try again."
            };
        }
    }

    private async Task<string> CallOllamaAsync(string systemPrompt, string userPrompt, CancellationToken cancellationToken)
    {
        var request = new
        {
            model = _configuration["Ollama:ChatModel"] ?? "llama3.2",
            messages = new[]
            {
                new { role = "system", content = systemPrompt },
                new { role = "user", content = userPrompt }
            },
            stream = false
        };

        var json = JsonSerializer.Serialize(request);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        _logger.LogInformation("Calling Ollama at: {BaseAddress}/api/chat with model: {Model}", _ollamaClient.BaseAddress, _configuration["Ollama:ChatModel"]);

        try
        {
            var response = await _ollamaClient.PostAsync("/api/chat", content, cancellationToken);

            _logger.LogInformation("Ollama response status: {StatusCode}", response.StatusCode);

            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync(cancellationToken);
            var result = JsonSerializer.Deserialize<OllamaChatResponse>(responseBody);

            var answer = result?.message?.content ?? throw new Exception("Empty response from Ollama");

            // Clean up response: remove prompt artifacts like "Answer:", question echoes, etc.
            answer = CleanOllamaResponse(answer);

            return answer;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calling Ollama");
            throw;
        }
    }

    private string CleanOllamaResponse(string response)
    {
        // Remove system prompt leakage and common artifacts
        var text = response;

        // Remove system prompt patterns
        text = System.Text.RegularExpressions.Regex.Replace(text, @"(You are a helpful assistant.*?)(?=\n|$)", "", System.Text.RegularExpressions.RegexOptions.IgnoreCase | System.Text.RegularExpressions.RegexOptions.Singleline);
        text = System.Text.RegularExpressions.Regex.Replace(text, @"(Always provide answers in.*?)(?=\n|$)", "", System.Text.RegularExpressions.RegexOptions.IgnoreCase | System.Text.RegularExpressions.RegexOptions.Singleline);

        // Split by lines and process
        var lines = text.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None)
            .Select(line => line.Trim())
            .Where(line => !string.IsNullOrEmpty(line))
            .ToList();

        // Remove lines that are questions or metadata
        var cleanedLines = lines
            .Where(line => !line.Equals("Answer:", StringComparison.OrdinalIgnoreCase) &&
                          !line.Equals("Answer options:", StringComparison.OrdinalIgnoreCase) &&
                          !line.StartsWith("Question:", StringComparison.OrdinalIgnoreCase) &&
                          !line.StartsWith("Can you", StringComparison.OrdinalIgnoreCase) &&
                          !line.StartsWith("What is", StringComparison.OrdinalIgnoreCase) &&
                          !line.StartsWith("What are", StringComparison.OrdinalIgnoreCase) &&
                          !line.StartsWith("How", StringComparison.OrdinalIgnoreCase))
            .ToList();

        // Find the answer section - stop at the next "Question:" or related patterns
        var resultLines = new List<string>();
        for (int i = 0; i < cleanedLines.Count; i++)
        {
            if (cleanedLines[i].StartsWith("Question:", StringComparison.OrdinalIgnoreCase) ||
                (i > 0 && cleanedLines[i].StartsWith("Answer:", StringComparison.OrdinalIgnoreCase) && i > 2))
            {
                break;
            }
            resultLines.Add(cleanedLines[i]);
        }

        var result = string.Join("\n", resultLines).Trim();
        return result;
    }

    public async Task SeedKnowledgeBaseAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Starting knowledge base seeding...");

        // Load data from database
        var profiles = await _context.Profiles
            .Include(p => p.SocialLinks)
            .ToListAsync(cancellationToken);

        var experiences = await _context.Experiences.ToListAsync(cancellationToken);
        var educations = await _context.Educations.ToListAsync(cancellationToken);
        var projects = await _context.Projects.ToListAsync(cancellationToken);
        var skills = await _context.Skills.ToListAsync(cancellationToken);

        var chunks = new List<(string content, string category)>();

        // Profile chunks
        foreach (var profile in profiles)
        {
            chunks.Add(($"""
                Name: {profile.Name}
                Title: {profile.Title}
                Bio: {profile.Bio}
                Email: {profile.Email}
                Location: Hamburg, Germany
                """, "Profile"));
        }

        // Experience chunks
        foreach (var exp in experiences)
        {
            chunks.Add(($"""
                Company: {exp.Company}
                Role: {exp.Role}
                Period: {exp.StartDate:MMM yyyy} - {(exp.IsCurrent ? "Present" : exp.EndDate?.ToString("MMM yyyy"))}
                Description: {exp.Description}
                Technologies: {exp.TechStack}
                """, "Experience"));
        }

        // Education chunks
        foreach (var edu in educations)
        {
            chunks.Add(($"""
                Institution: {edu.Institution}
                Degree: {edu.Degree}
                Field: {edu.FieldOfStudy}
                Period: {edu.StartDate:yyyy} - {edu.EndDate?.ToString("yyyy")}
                Description: {edu.Description}
                """, "Education"));
        }

        // Project chunks
        foreach (var project in projects)
        {
            chunks.Add(($"""
                Project: {project.Title}
                Description: {project.Description}
                Technologies: {project.TechStack}
                Status: {project.Status}
                """, "Project"));
        }

        // Skills chunk — grouped by category
        var skillsByCategory = skills.GroupBy(s => s.Category ?? "General");
        foreach (var group in skillsByCategory)
        {
            chunks.Add(($"""
                Skills in {group.Key}: {string.Join(", ", group.Select(s => s.Name))}
                """, "Skills"));
        }

        // Add specific skill subcategories for better retrieval
        var cloudAndInfra = skills.Where(s => s.Category == "Tools" && 
            (s.Name.Contains("Docker", StringComparison.OrdinalIgnoreCase) ||
             s.Name.Contains("Azure", StringComparison.OrdinalIgnoreCase) ||
             s.Name.Contains("AWS", StringComparison.OrdinalIgnoreCase) ||
             s.Name.Contains("Kubernetes", StringComparison.OrdinalIgnoreCase) ||
             s.Name.Contains("Cloud", StringComparison.OrdinalIgnoreCase))).ToList();
        if (cloudAndInfra.Any())
        {
            chunks.Add(($"""
                Cloud and Infrastructure Technologies: {string.Join(", ", cloudAndInfra.Select(s => s.Name))}
                Dhia has experience with containerization, orchestration, and cloud deployment platforms.
                """, "Cloud-Technologies"));
        }

        var devTools = skills.Where(s => s.Category == "Tools" && 
            (s.Name.Contains("Git", StringComparison.OrdinalIgnoreCase) ||
             s.Name.Contains("Postman", StringComparison.OrdinalIgnoreCase) ||
             s.Name.Contains("Visual Studio", StringComparison.OrdinalIgnoreCase) ||
             s.Name.Contains("GitHub", StringComparison.OrdinalIgnoreCase))).ToList();
        if (devTools.Any())
        {
            chunks.Add(($"""
                Development Tools: {string.Join(", ", devTools.Select(s => s.Name))}
                Dhia uses these tools for version control, API testing, and development.
                """, "Development-Tools"));
        }

        var frameworks = skills.Where(s => s.Category == "Frameworks" || 
            (s.Category == "Tools" && (s.Name.Contains("Entity Framework", StringComparison.OrdinalIgnoreCase) ||
             s.Name.Contains("Django", StringComparison.OrdinalIgnoreCase) ||
             s.Name.Contains("ASP.NET", StringComparison.OrdinalIgnoreCase)))).ToList();
        if (frameworks.Any())
        {
            chunks.Add(($"""
                Frameworks and Libraries: {string.Join(", ", frameworks.Select(s => s.Name))}
                Dhia has expertise in using these frameworks for web and application development.
                """, "Frameworks"));
        }

        var practices = skills.Where(s => s.Category == "Practices").ToList();
        if (practices.Any())
        {
            chunks.Add(($"""
                Software Development Practices: {string.Join(", ", practices.Select(s => s.Name))}
                Dhia follows best practices in software engineering and development methodologies.
                """, "Practices"));
        }

        // Education-Skills connection chunks (to explicitly link where skills were learned)
        foreach (var edu in educations)
        {
            chunks.Add(($"""
                {edu.Institution} ({edu.Degree} in {edu.FieldOfStudy}):
                {edu.Description}
                """, "Education-Skills"));
        }

        // Add explicit programming language chunk
        var programmingLanguages = skills.Where(s => s.Category == "Languages").ToList();
        if (programmingLanguages.Any())
        {
            chunks.Add(($"""
                Programming Languages: {string.Join(", ", programmingLanguages.Select(s => s.Name))}
                Dhia has knowledge and experience with multiple programming languages from his engineering education and professional work.
                """, "Technical-Skills"));
        }

        // Clear existing chunks and reseed
        _context.KnowledgeChunks.RemoveRange(_context.KnowledgeChunks);
        await _context.SaveChangesAsync(cancellationToken);

        // Generate embeddings and save
        foreach (var (content, category) in chunks)
        {
            var embedding = await _embeddingService.GenerateEmbeddingAsync(content, cancellationToken);

            _context.KnowledgeChunks.Add(new KnowledgeChunk
            {
                Content = content,
                Category = category,
                Embedding = new Vector(embedding)
            });
        }

        await _context.SaveChangesAsync(cancellationToken);
        _logger.LogInformation("Knowledge base seeding complete. {Count} chunks created.", chunks.Count);
    }

    // Response DTOs for deserialization
    private class OllamaChatResponse
    {
        public OllamaMessage? message { get; set; }
    }

    private class OllamaMessage
    {
        public string? role { get; set; }
        public string? content { get; set; }
    }
}