using PortfolioApp.Application.DTOs;
using PortfolioApp.Domain.Entities;

namespace PortfolioApp.Application.Interfaces
{
    public interface IEducationRepository : IGenericRepository<Education>
    {
        Task<EducationDTO> AddEducation(EducationDTO education, CancellationToken cancellationToken);
        Task<List<Education>> GetAllEducations(CancellationToken cancellationToken);
        Task<EducationDTO> GetEducationById(Guid id, CancellationToken cancellationToken);
        Task RemoveEducationById(Guid id, CancellationToken cancellationToken);
        Task<EducationDTO> UpdateEducation(EducationDTO education, CancellationToken cancellationToken);
    }
}
