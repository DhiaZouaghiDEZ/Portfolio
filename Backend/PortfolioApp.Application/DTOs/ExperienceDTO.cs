namespace PortfolioApp.Application.DTOs
{
    public class ExperienceDTO
    {
        public string Company { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? TechStack { get; set; } // Technologies used
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsCurrent { get; set; }
    }
}
