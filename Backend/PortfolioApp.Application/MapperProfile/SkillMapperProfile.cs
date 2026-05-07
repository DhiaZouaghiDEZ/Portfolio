using AutoMapper;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Domain.Entities;
using Profile = AutoMapper.Profile;

namespace PortfolioApp.Application.MapperProfile
{
    public class SkillMapperProfile : Profile
    {
        public SkillMapperProfile()
        {
            CreateMap<Skill, SkillDTO>();
            CreateMap<SkillDTO, Skill>();
        }
    }
}
