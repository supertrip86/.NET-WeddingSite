using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WeddingSite.BackEnd.DAL;

namespace WeddingSite.BackEnd.Controllers
{
    public class BaseController : ControllerBase
    {
        protected IMapper _mapper;
        protected WeddingSiteDbContext _context;

        public BaseController(IMapper mapper, WeddingSiteDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }
    }
}
