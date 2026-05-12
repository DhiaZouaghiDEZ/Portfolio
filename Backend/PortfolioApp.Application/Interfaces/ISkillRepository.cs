using PortfolioApp.Application.DTOs;
using PortfolioApp.Domain.Entities;

namespace PortfolioApp.Application.Interfaces
{
    public interface ISkillRepository : IGenericRepository<Skill>
    {
        Task<SkillDTO> AddSkill(SkillDTO skill, CancellationToken cancellationToken);
        Task<List<Skill>> GetAllSkills(CancellationToken cancellationToken);
        Task<SkillDTO> GetSkillById(Guid id, CancellationToken cancellationToken);
        Task RemoveSkillById(Guid id, CancellationToken cancellationToken);
        Task<SkillDTO> UpdateSkill(SkillDTO skill, CancellationToken cancellationToken);
    }
}
