using PortfolioApp.Application.Interfaces;
using PortfolioApp.Infrastructure.Data;
using System.Transactions;

namespace PortfolioApp.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task ExecuteInTransactionAsync(Func<Task> operation)
        {
            using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
            await operation();
            await SaveChangesAsync();
            scope.Complete();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
