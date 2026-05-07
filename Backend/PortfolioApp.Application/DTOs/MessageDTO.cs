namespace PortfolioApp.Application.DTOs
{
    public class MessageDTO 
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime SubmittedDate { get; set; }
        public bool IsRead { get; set; }
    }
}
