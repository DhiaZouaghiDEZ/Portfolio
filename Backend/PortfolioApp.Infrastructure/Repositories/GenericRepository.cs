using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PortfolioApp.Infrastructure.Data;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private readonly ApplicationDbContext _context;
    private readonly DbSet<T> _dbSet;
    private readonly ILogger<GenericRepository<T>> _logger;

    public GenericRepository(ApplicationDbContext context, ILogger<GenericRepository<T>> logger)
    {
        _context = context;
        _dbSet = context.Set<T>();
        _logger = logger;
    }

    public async Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        try
        {
            return await _dbSet.FindAsync(new object[] { id }, cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching {Entity} with id {Id}", typeof(T).Name, id);
            throw;
        }
    }

    public async Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            return await _dbSet.ToListAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching all {Entity}", typeof(T).Name);
            throw;
        }
    }

    public async Task<T> AddAsync(T entity, CancellationToken cancellationToken = default)
    {
        try
        {
            _logger.LogInformation("Adding new {Entity}", typeof(T).Name);
            await _dbSet.AddAsync(entity, cancellationToken);
            return entity;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding {Entity}", typeof(T).Name);
            throw;
        }
    }

    public async Task<bool> UpdateAsync(T entity, CancellationToken cancellationToken = default)
    {
        try
        {
            _logger.LogInformation("Updating {Entity}", typeof(T).Name);
            _dbSet.Update(entity);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating {Entity}", typeof(T).Name);
            throw;
        }
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        try
        {
            var entity = await GetByIdAsync(id, cancellationToken);
            if (entity == null)
            {
                _logger.LogWarning("{Entity} with id {Id} not found for deletion", typeof(T).Name, id);
                return false;
            }
            _logger.LogInformation("Deleting {Entity} with id {Id}", typeof(T).Name, id);
            _dbSet.Remove(entity);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting {Entity} with id {Id}", typeof(T).Name, id);
            throw;
        }
    }
}