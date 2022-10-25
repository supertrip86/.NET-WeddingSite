using AutoMapper;

namespace WeddingSite.BackEnd.DAL.Mappings
{
    public class GuestsMapping : Profile
    {
        public GuestsMapping()
        {
            CreateMap<Responses.Guest, Models.Guest>().ReverseMap();
        }
    }
}
