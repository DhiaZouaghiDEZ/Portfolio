using AutoMapper;
using Microsoft.Extensions.Logging;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;
using PortfolioApp.Domain.Entities;
using PortfolioApp.Infrastructure.Data;

namespace PortfolioApp.Infrastructure.Repositories
{
    public class ExperienceRepository : GenericRepository<Experience>, IExperienceRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ExperienceRepository(ApplicationDbContext context, ILogger<GenericRepository<Experience>> logger, IUnitOfWork unitOfWork, IMapper mapper) : base(context, logger)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<ExperienceDTO> AddExperience(ExperienceDTO experience, CancellationToken cancellationToken)
        {
            if (experience == null)
                throw new ArgumentNullException(nameof(experience));

            var newExperience = _mapper.Map<Experience>(experience);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await AddAsync(newExperience, cancellationToken);
            }, cancellationToken);

            return _mapper.Map<ExperienceDTO>(newExperience);
        }
        public async Task<List<Experience>> GetAllExperiences(CancellationToken cancellationToken)
        {
            var returnedExperiences = new List<Experience>();
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                var experiences = await GetAllAsync(cancellationToken);
                returnedExperiences.AddRange(experiences.ToList());
            });
            return returnedExperiences;
        }
        public async Task<ExperienceDTO> GetExperienceById(Guid id, CancellationToken cancellationToken)
        {
            var experience = new Experience();
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                experience = await GetByIdAsync(id, cancellationToken);
            });
            return _mapper.Map<ExperienceDTO>(experience);
        }
        public async Task RemoveExperienceById(Guid id, CancellationToken cancellationToken)
        {
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await DeleteAsync(id, cancellationToken);
            });
        }
        public async Task<ExperienceDTO> UpdateExperience(ExperienceDTO experience, CancellationToken cancellationToken)
        {
            if (experience == null)
                throw new ArgumentNullException(nameof(experience));
            var newExperience = _mapper.Map<Experience>(experience);
            newExperience.LastModifiedDate = DateTime.UtcNow;
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await UpdateAsync(newExperience, cancellationToken);
            }, cancellationToken);

            return _mapper.Map<ExperienceDTO>(newExperience);
        }
    }
}
