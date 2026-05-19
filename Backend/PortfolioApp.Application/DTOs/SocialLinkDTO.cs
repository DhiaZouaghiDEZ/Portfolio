using System;
using System.Collections.Generic;
using System.Text;

namespace PortfolioApp.Application.DTOs
{
    public class SocialLinkDTO
    {
        public Guid Id { get; set; }
        public string Platform { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
    }
}
