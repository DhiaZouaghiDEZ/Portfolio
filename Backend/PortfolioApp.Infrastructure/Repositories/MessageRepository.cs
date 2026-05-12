using AutoMapper;
using Microsoft.Extensions.Logging;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;
using PortfolioApp.Domain.Entities;
using PortfolioApp.Infrastructure.Data;

namespace PortfolioApp.Infrastructure.Repositories
{
    public class MessageRepository : GenericRepository<Message>, IMessageRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public MessageRepository(ApplicationDbContext context, ILogger<GenericRepository<Message>> logger, IUnitOfWork unitOfWork, IMapper mapper) : base(context, logger)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<MessageDTO> AddMessage(MessageDTO message, CancellationToken cancellationToken)
        {
            if (message == null)
                throw new ArgumentNullException(nameof(message));

            var newMessage = _mapper.Map<Message>(message);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await AddAsync(newMessage, cancellationToken);
            }, cancellationToken);

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
