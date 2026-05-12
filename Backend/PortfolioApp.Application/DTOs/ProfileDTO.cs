namespace PortfolioApp.Application.DTOs
{
    public class ProfileDTO 
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string? Avatar { get; set; }
        public string? Bio { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }

        public string? SocialLinks { get; set; }
    }
}
