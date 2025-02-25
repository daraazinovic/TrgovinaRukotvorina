using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{


    [ApiController]
    [Route("api/v1/[controller]")]

    public class ProizvodController(BackendContext context, IMapper mapper) : BackendController(context, mapper)
    {


    }
}
