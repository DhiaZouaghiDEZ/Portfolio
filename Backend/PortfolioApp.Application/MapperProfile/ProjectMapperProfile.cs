using AutoMapper;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Domain.Entities;
using Profile = AutoMapper.Profile;

namespace PortfolioApp.Application.MapperProfile
{
    public class ProjectMapperProfile : Profile
    {
        public ProjectMapperProfile()
        {
            CreateMap<Project, ProjectDTO>();
            CreateMap<ProjectDTO, Project>();
        }
    }
}
