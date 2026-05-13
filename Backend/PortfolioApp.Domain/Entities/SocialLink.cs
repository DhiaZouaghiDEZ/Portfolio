using System;
using System.Collections.Generic;
using System.Text;

namespace PortfolioApp.Domain.Entities
{
    public class SocialLink
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid ProfileId { get; set; }
        public string Platform { get; set; } = string.Empty; 
        public string Url { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime LastModifiedDate { get; set; } = DateTime.UtcNow;

        public Profile Profile { get; set; } = null!;
    }
}
