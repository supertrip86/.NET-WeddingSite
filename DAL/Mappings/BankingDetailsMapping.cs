using AutoMapper;

namespace WeddingSite.BackEnd.DAL.Mappings
{
    public class BankingDetailsMapping : Profile
    {
        public BankingDetailsMapping()
        {
            CreateMap<Responses.BankingDetails, Models.BankingDetails>().ReverseMap();
        }
    }
}
