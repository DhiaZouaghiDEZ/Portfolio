using Microsoft.Extensions.Logging;
using PortfolioApp.Application.Interfaces;
using PortfolioApp.Domain.Entities;
using PortfolioApp.Infrastructure.Data;

namespace PortfolioApp.Infrastructure.Repositories
{
    public class MessageRepository : GenericRepository<Message>, IMessageRepository
    {
        public MessageRepository(ApplicationDbContext context, ILogger<GenericRepository<Message>> logger) : base(context, logger)
        {
           
        }
    }
}
