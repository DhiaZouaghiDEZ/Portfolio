namespace PortfolioApp.Application.DTOs
{
    public class ProjectDTO 
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? TechStack { get; set; } // JSON or comma-separated
        public string? Links { get; set; } // JSON for multiple links
        public string? ImageUrl { get; set; }
        public bool Featured { get; set; }
        public string? Status { get; set; } // active, archived, in-progress
    }
}
