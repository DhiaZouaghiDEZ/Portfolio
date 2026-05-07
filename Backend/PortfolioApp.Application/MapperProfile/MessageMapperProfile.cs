using AutoMapper;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Domain.Entities;
using Profile = AutoMapper.Profile;

namespace PortfolioApp.Application.MapperProfile
{
    public class MessageMapperProfile : Profile
    {
        public MessageMapperProfile()
        {
            CreateMap<Message, MessageDTO>();
            CreateMap<MessageDTO, Message>();
        }
    }
}
