using AutoMapper;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public abstract class BackendController : ControllerBase
    {


        protected readonly BackendContext _context;

        protected readonly IMapper _mapper;



        public BackendController(BackendContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}
