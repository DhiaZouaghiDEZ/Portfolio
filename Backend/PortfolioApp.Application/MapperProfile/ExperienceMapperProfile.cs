using AutoMapper;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Domain.Entities;
using Profile = AutoMapper.Profile;

namespace PortfolioApp.Application.MapperProfile
{
    public class ExperienceMapperProfile : Profile
    {
        public ExperienceMapperProfile()
        {
            CreateMap<Experience, ExperienceDTO>();
            CreateMap<ExperienceDTO, Experience>();
        }
    }
}
