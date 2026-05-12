using Microsoft.Extensions.Logging;
using PortfolioApp.Application.Interfaces;
using PortfolioApp.Infrastructure.Data;
using System.Transactions;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<UnitOfWork> _logger;

    public UnitOfWork(ApplicationDbContext context, ILogger<UnitOfWork> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task ExecuteInTransactionAsync(Func<Task> operation, CancellationToken cancellationToken = default)
    {
        try
        {
            _logger.LogInformation("Starting transaction");
            using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
            await operation();
            await SaveChangesAsync(cancellationToken);
            scope.Complete();
            _logger.LogInformation("Transaction completed successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Transaction failed and was rolled back");
            throw;
        }
    }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}