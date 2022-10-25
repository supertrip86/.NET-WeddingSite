using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WeddingSite.BackEnd.DAL;

namespace WeddingSite.BackEnd.Controllers
{
    public class BaseController : ControllerBase
    {
        protected IMapper _mapper;
        protected IConfiguration _config;
        protected WeddingSiteDbContext _context;

        public BaseController(IMapper mapper, IConfiguration config, WeddingSiteDbContext context)
        {
            _mapper = mapper;
            _config = config;
            _context = context;
        }
    }
}
