using Microsoft.EntityFrameworkCore;
using PortfolioApp.Domain.Entities;

namespace PortfolioApp.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Profile> Profiles { get; set; } = null!;
    public DbSet<Project> Projects { get; set; } = null!;
    public DbSet<Skill> Skills { get; set; } = null!;
    public DbSet<Experience> Experiences { get; set; } = null!;
    public DbSet<Education> Educations { get; set; } = null!;
    public DbSet<Message> Messages { get; set; } = null!;
    public DbSet<SocialLink> SocialLinks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Profile>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(e => e.Title)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(e => e.Email)
                .HasMaxLength(255);

            entity.Property(e => e.Phone)
                .HasMaxLength(20);

            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("NOW()");

            entity.Property(e => e.LastModifiedDate)
                .HasDefaultValueSql("NOW()");
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Title)
                .IsRequired()
                .HasMaxLength(300);

            entity.Property(e => e.Status)
                .HasMaxLength(50);

            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("NOW()");

            entity.Property(e => e.LastModifiedDate)
                .HasDefaultValueSql("NOW()");
        });

        modelBuilder.Entity<Skill>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(e => e.Category)
                .HasMaxLength(100);

            entity.Property(e => e.Proficiency)
                .IsRequired();

            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("NOW()");

            entity.Property(e => e.LastModifiedDate)
                .HasDefaultValueSql("NOW()");
        });

        modelBuilder.Entity<Experience>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Company)
                .IsRequired()
                .HasMaxLength(300);

            entity.Property(e => e.Role)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(e => e.StartDate)
                .IsRequired();

            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("NOW()");

            entity.Property(e => e.LastModifiedDate)
                .HasDefaultValueSql("NOW()");
        });

        modelBuilder.Entity<Education>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Institution)
                .IsRequired()
                .HasMaxLength(300);

            entity.Property(e => e.Degree)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(e => e.FieldOfStudy)
                .HasMaxLength(200);

            entity.Property(e => e.StartDate)
                .IsRequired();

            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("NOW()");

            entity.Property(e => e.LastModifiedDate)
                .HasDefaultValueSql("NOW()");
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(255);

            entity.Property(e => e.Subject)
                .IsRequired()
                .HasMaxLength(500);

            entity.Property(e => e.Content)
                .IsRequired();

            entity.Property(e => e.SubmittedDate)
                .HasDefaultValueSql("NOW()");

            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("NOW()");

            entity.Property(e => e.LastModifiedDate)
                .HasDefaultValueSql("NOW()");
        });

        modelBuilder.Entity<SocialLink>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Platform).HasMaxLength(100).IsRequired();
            entity.Property(e => e.Url).HasMaxLength(500).IsRequired();

            entity.HasOne(e => e.Profile)
                  .WithMany(p => p.SocialLinks)
                  .HasForeignKey(e => e.ProfileId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
