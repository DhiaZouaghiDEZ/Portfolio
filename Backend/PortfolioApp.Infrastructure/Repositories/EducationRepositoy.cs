using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;
using PortfolioApp.Domain.Entities;
using PortfolioApp.Infrastructure.Data;

namespace PortfolioApp.Infrastructure.Repositories
{
    public class EducationRepository : GenericRepository<Education>, IEducationRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public EducationRepository(ApplicationDbContext context, ILogger<GenericRepository<Education>> logger, IUnitOfWork unitOfWork, IMapper mapper) : base(context, logger)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<EducationDTO> AddEducation(EducationDTO education, CancellationToken cancellationToken)
        {
            if (education == null)
                throw new ArgumentNullException(nameof(education));

            var newEducation = _mapper.Map<Education>(education);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await AddAsync(newEducation, cancellationToken);
            }, cancellationToken);

            return _mapper.Map<EducationDTO>(newEducation);
        }
        public async Task<List<Education>> GetAllEducations(CancellationToken cancellationToken)
        {
            var returnedEducations = new List<Education>();
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                var educations = await GetAllAsync(cancellationToken);
                returnedEducations.AddRange(educations.ToList());
            });
            return returnedEducations;
        }
        public async Task<EducationDTO> GetEducationById(Guid id, CancellationToken cancellationToken)
        {
            var education = new Education();
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                education = await GetByIdAsync(id, cancellationToken);
            });
            return _mapper.Map<EducationDTO>(education);
        }
        public async Task RemoveEducationById(Guid id, CancellationToken cancellationToken)
        {
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await DeleteAsync(id, cancellationToken);
            });
        }
        public async Task<EducationDTO> UpdateEducation(EducationDTO education, CancellationToken cancellationToken)
        {
            if (education == null)
                throw new ArgumentNullException(nameof(education));
            var newEducation = _mapper.Map<Education>(education);
            newEducation.LastModifiedDate = DateTime.UtcNow;
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await UpdateAsync(newEducation, cancellationToken);
            }, cancellationToken);

            return _mapper.Map<EducationDTO>(newEducation);
        }
    }
}
