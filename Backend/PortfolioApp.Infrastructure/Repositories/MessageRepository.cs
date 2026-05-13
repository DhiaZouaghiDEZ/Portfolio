using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;
using PortfolioApp.Domain.Entities;
using PortfolioApp.Infrastructure.Data;
using PortfolioApp.Infrastructure.Services;

namespace PortfolioApp.Infrastructure.Repositories
{
    public class MessageRepository : GenericRepository<Message>, IMessageRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        public MessageRepository(ApplicationDbContext context, ILogger<GenericRepository<Message>> logger, IUnitOfWork unitOfWork, IMapper mapper,
            IEmailService emailService, IConfiguration configuration) : base(context, logger)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _emailService = emailService;
            _configuration = configuration;
        }
        public async Task<MessageDTO> AddMessage(MessageDTO message, CancellationToken cancellationToken)
        {
            if (message == null)
                throw new ArgumentNullException(nameof(message));

            var newMessage = _mapper.Map<Message>(message);
            var toEmail = _configuration["SendGrid:ToEmail"];

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await AddAsync(newMessage, cancellationToken);
            }, cancellationToken);

            await _emailService.SendEmailAsync(
                toEmail: toEmail,
                subject: $"📩 New message from {message.Name}: {message.Subject}",
                content: $@"
                    <h2>New Portfolio Message</h2>
                    <table>
                        <tr><td><strong>Name:</strong></td><td>{message.Name}</td></tr>
                        <tr><td><strong>Email:</strong></td><td><a href='mailto:{message.Email}'>{message.Email}</a></td></tr>
                        <tr><td><strong>Subject:</strong></td><td>{message.Subject}</td></tr>
                    </table>
                    <h3>Message:</h3>
                    <p>{message.Content}</p>
                ",
                cancellationToken: cancellationToken
            );

            return _mapper.Map<MessageDTO>(newMessage);
        }
        public async Task<List<Message>> GetAllMessages(CancellationToken cancellationToken)
        {
            var returnedMessages = new List<Message>();
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                var messages = await GetAllAsync(cancellationToken);
                returnedMessages.AddRange(messages.ToList());
            });
            return returnedMessages;
        }
        public async Task<MessageDTO> GetMessageById(Guid id, CancellationToken cancellationToken)
        {
            var message = new Message();
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                message = await GetByIdAsync(id, cancellationToken);
            });
            return _mapper.Map<MessageDTO>(message);
        }
        public async Task RemoveMessageById(Guid id, CancellationToken cancellationToken)
        {
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await DeleteAsync(id, cancellationToken);
            });
        }
        public async Task<MessageDTO> UpdateMessage(MessageDTO message, CancellationToken cancellationToken)
        {
            if (message == null)
                throw new ArgumentNullException(nameof(message));
            var newMessage = _mapper.Map<Message>(message);
            newMessage.LastModifiedDate = DateTime.UtcNow;
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await UpdateAsync(newMessage, cancellationToken);
            }, cancellationToken);

            return _mapper.Map<MessageDTO>(newMessage);
        }
    }
}
