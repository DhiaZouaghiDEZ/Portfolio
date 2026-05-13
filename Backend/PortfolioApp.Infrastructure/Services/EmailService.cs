using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using PortfolioApp.Application.Interfaces;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace PortfolioApp.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string content, CancellationToken cancellationToken = default)
        {
            var apiKey = _configuration["SendGrid:ApiKey"];
            var fromEmail = _configuration["SendGrid:FromEmail"];
            var fromName = _configuration["SendGrid:FromName"];

            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(fromEmail, fromName);
            var to = new EmailAddress(toEmail);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent: null, htmlContent: content);

            var response = await client.SendEmailAsync(msg, cancellationToken);

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("Failed to send email to {Email}. Status: {Status}", toEmail, response.StatusCode);
                throw new Exception($"Failed to send email: {response.StatusCode}");
            }

            _logger.LogInformation("Email sent successfully to {Email}", toEmail);
        }
    }
}
