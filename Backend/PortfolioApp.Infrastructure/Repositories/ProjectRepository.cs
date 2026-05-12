using AutoMapper;
using Microsoft.Extensions.Logging;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;
using PortfolioApp.Domain.Entities;
using PortfolioApp.Infrastructure.Data;

namespace PortfolioApp.Infrastructure.Repositories
{
    public class ProjectRepository : GenericRepository<Project>, IProjectRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ProjectRepository(ApplicationDbContext context, ILogger<GenericRepository<Project>> logger, IUnitOfWork unitOfWork, IMapper mapper) : base(context, logger)
        {
           _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<ProjectDTO> AddProject(ProjectDTO project, CancellationToken cancellationToken)
        {
            if (project == null)
                throw new ArgumentNullException(nameof(project));

            var newProject = _mapper.Map<Project>(project);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await AddAsync(newProject, cancellationToken);
            }, cancellationToken);

            return _mapper.Map<ProjectDTO>(newProject);
        }
        public async Task<List<Project>> GetAllProjects(CancellationToken cancellationToken)
        {
            var returnedProjects = new List<Project>();
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                var projects = await GetAllAsync(cancellationToken);
                returnedProjects.AddRange(projects.ToList());
            });
            return returnedProjects;
        }
        public async Task<ProjectDTO> GetProjectById(Guid id, CancellationToken cancellationToken)
        {
            var project = new Project();
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                project = await GetByIdAsync(id, cancellationToken);
            });
            return _mapper.Map<ProjectDTO>(project);
        }
        public async Task RemoveProjectById(Guid id, CancellationToken cancellationToken)
        {
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await DeleteAsync(id, cancellationToken);
            });
        }
        public async Task<ProjectDTO> UpdateProject(ProjectDTO project, CancellationToken cancellationToken)
        {
            if (project == null)
                throw new ArgumentNullException(nameof(project));
            var newProject = _mapper.Map<Project>(project);
            newProject.LastModifiedDate = DateTime.UtcNow;
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await UpdateAsync(newProject, cancellationToken);
            }, cancellationToken);

            return _mapper.Map<ProjectDTO>(newProject);
        }
    }
}
