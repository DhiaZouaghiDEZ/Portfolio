using PortfolioApp.Application.DTOs;
using PortfolioApp.Domain.Entities;

namespace PortfolioApp.Application.Interfaces
{
    public interface IExperienceRepository : IGenericRepository<Experience>
    {
        Task<ExperienceDTO> AddExperience(ExperienceDTO experience, CancellationToken cancellationToken);
        Task<List<Experience>> GetAllExperiences(CancellationToken cancellationToken);
        Task<ExperienceDTO> GetExperienceById(Guid id, CancellationToken cancellationToken);
        Task RemoveExperienceById(Guid id, CancellationToken cancellationToken);
        Task<ExperienceDTO> UpdateExperience(ExperienceDTO experience, CancellationToken cancellationToken);
    }
}
