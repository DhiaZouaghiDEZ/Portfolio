using PortfolioApp.Application.DTOs;
using PortfolioApp.Domain.Entities;

namespace PortfolioApp.Application.Interfaces
{
    public interface IMessageRepository : IGenericRepository<Message>
    {
        Task<MessageDTO> AddMessage(MessageDTO message, CancellationToken cancellationToken);
        Task<List<Message>> GetAllMessages(CancellationToken cancellationToken);
        Task<MessageDTO> GetMessageById(Guid id, CancellationToken cancellationToken);
        Task RemoveMessageById(Guid id, CancellationToken cancellationToken);
        Task<MessageDTO> UpdateMessage(MessageDTO message, CancellationToken cancellationToken);
    }
}
