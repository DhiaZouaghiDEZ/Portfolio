using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;
using PortfolioApp.Domain.Entities;
using PortfolioApp.Infrastructure.Data;

namespace PortfolioApp.Infrastructure.Repositories
{
    public class ProfileRepository : GenericRepository<Domain.Entities.Profile>, IProfileRepository
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ApplicationDbContext _context;
        public ProfileRepository(ApplicationDbContext context, IMapper mapper, IUnitOfWork unitOfWork, ILogger<GenericRepository<Domain.Entities.Profile>> logger) : base(context, logger)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _context = context;
        }
        public async Task<ProfileDTO> CreateProfile(ProfileDTO profile, CancellationToken cancellationToken)
        {
            if (profile == null)
                throw new ArgumentNullException(nameof(profile));

            var newProfile = _mapper.Map<Domain.Entities.Profile>(profile);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await AddAsync(newProfile, cancellationToken);
            }, cancellationToken);

            return _mapper.Map<ProfileDTO>(newProfile);
        }
        public async Task<List<Domain.Entities.Profile>> GetAllProfiles(CancellationToken cancellationToken)
        {
            var returnedProfiles = new List<Domain.Entities.Profile>();
                return await _context.Profiles
                    .Include(p => p.SocialLinks)
                    .ToListAsync(cancellationToken);

        }
        public async Task<ProfileDTO> GetProfileById(Guid id, CancellationToken cancellationToken)
        {
            var profile = new Domain.Entities.Profile();
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                profile = await GetByIdAsync(id,cancellationToken);
            });
            return _mapper.Map<ProfileDTO>(profile);
        }
        public async Task RemoveProfileById(Guid id, CancellationToken cancellationToken)
        {
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await DeleteAsync(id, cancellationToken);
            });
        }
        public async Task<ProfileDTO> UpdateProfile(ProfileDTO profile,CancellationToken cancellationToken)
        {
            if (profile == null)
                throw new ArgumentNullException(nameof(profile));
            var newProfile = _mapper.Map<Domain.Entities.Profile>(profile);
            newProfile.LastModifiedDate = DateTime.UtcNow;
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await UpdateAsync(newProfile, cancellationToken);
            }, cancellationToken);

            return _mapper.Map<ProfileDTO>(newProfile);
        }
    }
}
