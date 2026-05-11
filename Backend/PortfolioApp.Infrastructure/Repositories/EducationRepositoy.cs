using Microsoft.EntityFrameworkCore;
using PortfolioApp.Application.Interfaces;
using PortfolioApp.Domain.Entities;
using PortfolioApp.Infrastructure.Data;
using Microsoft.Extensions.Logging;

namespace PortfolioApp.Infrastructure.Repositories
{
    public class EducationRepository : GenericRepository<Education>, IEducationRepository
    {
        public EducationRepository(ApplicationDbContext context, ILogger<GenericRepository<Education>> logger) : base(context,logger)
        {
           
        }
    }
}
