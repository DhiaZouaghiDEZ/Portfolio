namespace PortfolioApp.Domain.Entities;

public class Profile
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? Avatar { get; set; }
    public string? Bio { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }

    public ICollection<SocialLink> SocialLinks { get; set; } = new List<SocialLink>();

    public DateTime CreatedDate { get; set; }
    public DateTime LastModifiedDate { get; set; }
}
