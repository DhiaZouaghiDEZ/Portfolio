using Microsoft.EntityFrameworkCore;
using PortfolioApp.Application.Interfaces;
using PortfolioApp.Domain.Entities;
using PortfolioApp.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace PortfolioApp.Infrastructure.Repositories
{
    public class EducationRepository : GenericRepository<Education>, IEducationRepository
    {
        public EducationRepository(ApplicationDbContext context) : base(context)
        {
           
        }
    }
}
