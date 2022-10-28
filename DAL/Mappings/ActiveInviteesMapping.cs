using AutoMapper;

namespace WeddingSite.BackEnd.DAL.Mappings
{
    public class ActiveInviteesMapping : Profile
    {
        public ActiveInviteesMapping()
        {
            CreateMap<Responses.ActiveInvitee, Models.ActiveInvitee>().ReverseMap();
        }
    }
}
