using PortfolioApp.Application.DTOs;

namespace PortfolioApp.Application.Interfaces;

public interface IAgentService
{
    Task<AgentResponseDTO> AskAsync(string question, CancellationToken cancellationToken = default);
    Task SeedKnowledgeBaseAsync(CancellationToken cancellationToken = default);
}