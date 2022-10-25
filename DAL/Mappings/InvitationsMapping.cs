using AutoMapper;

namespace WeddingSite.BackEnd.DAL.Mappings
{
    public class InvitationsMapping : Profile
    {
        public InvitationsMapping()
        {
            CreateMap<Responses.Invitee, Models.Invitee>().ReverseMap();
        }
    }
}
