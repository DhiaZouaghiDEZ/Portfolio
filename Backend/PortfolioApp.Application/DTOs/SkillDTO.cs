namespace PortfolioApp.Application.DTOs
{
    public class SkillDTO 
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public string? Category { get; set; } // Backend, Frontend, DevOps, etc.
        public int Proficiency { get; set; } // 1-5 scale
        public int? Endorsements { get; set; }
    }
}
