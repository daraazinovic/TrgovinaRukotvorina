using Backend.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Conterollers
{
   
    
    [ApiController]
    [Route("api/v1[controller]")]

    public class ProizvodController : ControllerBase
    {


        private readonly BackendContext _context;

            public ProizvodController(BackendContext context)
            {
                _context = context;
            }

            [HttpGet]

            public IActionResult Get()
            {
                try
                {
                    return Ok(_context.Proizvodi);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }


            }

        


       


            

           
         



    }
}
