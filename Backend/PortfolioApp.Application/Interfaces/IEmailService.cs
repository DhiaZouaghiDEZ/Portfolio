using System;
using System.Collections.Generic;
using System.Text;

namespace PortfolioApp.Application.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(string toEmail, string subject, string content, CancellationToken cancellationToken = default);
    }
}
