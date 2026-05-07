using Microsoft.EntityFrameworkCore;
using PortfolioApp.Domain.Entities;
using PortfolioApp.Infrastructure.Data;
using PortfolioApp.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace PortfolioApp.Infrastructure.Repositories
{
    public class SkillRepository : GenericRepository<Skill>, ISkillRepository
    {
        public SkillRepository(ApplicationDbContext context) : base(context)
        {
           
        }
    }
}
