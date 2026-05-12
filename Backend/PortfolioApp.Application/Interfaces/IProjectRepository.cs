using PortfolioApp.Application.DTOs;
using PortfolioApp.Domain.Entities;

namespace PortfolioApp.Application.Interfaces
{
    public interface IProjectRepository : IGenericRepository<Project>
    {
        Task<ProjectDTO> AddProject(ProjectDTO project, CancellationToken cancellationToken);
        Task<List<Project>> GetAllProjects(CancellationToken cancellationToken);
        Task<ProjectDTO> GetProjectById(Guid id, CancellationToken cancellationToken);
        Task RemoveProjectById(Guid id, CancellationToken cancellationToken);
        Task<ProjectDTO> UpdateProject(ProjectDTO project, CancellationToken cancellationToken);
    }
}
