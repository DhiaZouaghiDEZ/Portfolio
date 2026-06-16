using Pgvector;

namespace PortfolioApp.Domain.Entities;

public class KnowledgeChunk
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Content { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public Vector? Embedding { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}