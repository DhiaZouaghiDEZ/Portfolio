using AutoMapper;
using Microsoft.Extensions.Logging;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;
using PortfolioApp.Infrastructure.Data;

namespace PortfolioApp.Infrastructure.Repositories
{
    public class ProfileRepository : GenericRepository<Domain.Entities.Profile>, IProfileRepository
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ProfileRepository(ApplicationDbContext context, IMapper mapper, IUnitOfWork unitOfWork, ILogger<GenericRepository<Domain.Entities.Profile>> logger) : base(context, logger)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<ProfileDTO> CreateProfile(ProfileDTO profile)
        {
            if (profile == null)
                throw new ArgumentNullException(nameof(profile));

            var newProfile = _mapper.Map<Domain.Entities.Profile>(profile);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await AddAsync(newProfile);
            });

            return _mapper.Map<ProfileDTO>(newProfile);
        }
    }
}
