namespace PortfolioApp.Application.DTOs
{
    public class EducationDTO 
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Institution { get; set; } = string.Empty;
        public string Degree { get; set; } = string.Empty;
        public string? FieldOfStudy { get; set; }
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsCurrent { get; set; }
    }
}
