using AutoMapper;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Domain.Entities;
using Profile = AutoMapper.Profile;

namespace PortfolioApp.Application.MapperProfile
{
    public class EducationMapperProfile : Profile
    {
        public EducationMapperProfile()
        {
            CreateMap<Education, EducationDTO>();
            CreateMap<EducationDTO, Education>();
        }
    }
}
