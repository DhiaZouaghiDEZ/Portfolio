using Microsoft.EntityFrameworkCore;
using PortfolioApp.Domain.Entities;

namespace PortfolioApp.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<WeatherForecast> WeatherForecasts { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure WeatherForecast entity
        modelBuilder.Entity<WeatherForecast>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Date)
                .IsRequired();

            entity.Property(e => e.TemperatureC)
                .IsRequired();

            entity.Property(e => e.Summary)
                .HasMaxLength(100);
        });
    }
}
