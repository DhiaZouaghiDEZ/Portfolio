using PortfolioApp.Application.DTOs;
using PortfolioApp.Domain.Entities;

namespace PortfolioApp.Application.Interfaces
{
    public interface IProfileRepository : IGenericRepository<Profile>
    {
        Task<ProfileDTO> CreateProfile(ProfileDTO profile, CancellationToken cancellationToken);
        Task<List<Domain.Entities.Profile>> GetAllProfiles(CancellationToken cancellationToken);
        Task<ProfileDTO> GetProfileById(Guid id, CancellationToken cancellationToken);
        Task RemoveProfileById(Guid id, CancellationToken cancellationToken);
        Task<ProfileDTO> UpdateProfile(ProfileDTO profile, CancellationToken cancellationToken);
    }
}
