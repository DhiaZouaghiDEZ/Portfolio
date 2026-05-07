using AutoMapper;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Domain.Entities;

namespace PortfolioApp.Application.MapperProfile
{
    public class ProfileMapperProfile : AutoMapper.Profile
    {
        public ProfileMapperProfile()
        {
            CreateMap<Domain.Entities.Profile, ProfileDTO>();
            CreateMap<ProfileDTO, Domain.Entities.Profile>();
        }
    }
}
