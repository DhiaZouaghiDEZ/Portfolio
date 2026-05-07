namespace PortfolioApp.Domain.Entities;

public class Skill
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Category { get; set; } // Backend, Frontend, DevOps, etc.
    public int Proficiency { get; set; } // 1-5 scale
    public int? Endorsements { get; set; }

    public DateTime CreatedDate { get; set; }
    public DateTime LastModifiedDate { get; set; }
}
