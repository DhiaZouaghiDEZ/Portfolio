using System;
using System.Collections.Generic;
using System.Text;

namespace PortfolioApp.Application.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        Task ExecuteInTransactionAsync(Func<Task> operation, CancellationToken cancellationToken = default);
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
