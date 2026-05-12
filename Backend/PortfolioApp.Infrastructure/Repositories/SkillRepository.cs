using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;
using PortfolioApp.Domain.Entities;
using PortfolioApp.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace PortfolioApp.Infrastructure.Repositories
{
    public class SkillRepository : GenericRepository<Skill>, ISkillRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public SkillRepository(ApplicationDbContext context, ILogger<GenericRepository<Skill>> logger, IUnitOfWork unitOfWork, IMapper mapper) : base(context, logger)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<SkillDTO> AddSkill(SkillDTO skill, CancellationToken cancellationToken)
        {
            if (skill == null)
                throw new ArgumentNullException(nameof(skill));

            var newSkill = _mapper.Map<Skill>(skill);

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await AddAsync(newSkill, cancellationToken);
            }, cancellationToken);

            return _mapper.Map<SkillDTO>(newSkill);
        }
        public async Task<List<Skill>> GetAllSkills(CancellationToken cancellationToken)
        {
            var returnedSkills = new List<Skill>();
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                var skills = await GetAllAsync(cancellationToken);
                returnedSkills.AddRange(skills.ToList());
            });
            return returnedSkills;
        }
        public async Task<SkillDTO> GetSkillById(Guid id, CancellationToken cancellationToken)
        {
            var skill = new Skill();
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                skill = await GetByIdAsync(id, cancellationToken);
            });
            return _mapper.Map<SkillDTO>(skill);
        }
        public async Task RemoveSkillById(Guid id, CancellationToken cancellationToken)
        {
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await DeleteAsync(id, cancellationToken);
            });
        }
        public async Task<SkillDTO> UpdateSkill(SkillDTO skill, CancellationToken cancellationToken)
        {
            if (skill == null)
                throw new ArgumentNullException(nameof(skill));
            var newSkill = _mapper.Map<Skill>(skill);
            newSkill.LastModifiedDate = DateTime.UtcNow;
            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                await UpdateAsync(newSkill, cancellationToken);
            }, cancellationToken);

            return _mapper.Map<SkillDTO>(newSkill);
        }
    }
}
