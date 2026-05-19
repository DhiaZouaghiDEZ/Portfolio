using AutoMapper;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Domain.Entities;

namespace PortfolioApp.Application.MapperProfile
{
    public class ProfileMapperProfile : AutoMapper.Profile
    {
        public ProfileMapperProfile()
        {
            CreateMap<SocialLink, SocialLinkDTO>()
                .ForMember(dest => dest.Platform, opt => opt.MapFrom(src => src.Platform))
                .ForMember(dest => dest.Url, opt => opt.MapFrom(src => src.Url));
            CreateMap<Domain.Entities.Profile, ProfileDTO>()
                .ForMember(dest => dest.SocialLinks, opt => opt.MapFrom(src => src.SocialLinks));
            CreateMap<ProfileDTO, Domain.Entities.Profile>();
        }
    }
}
