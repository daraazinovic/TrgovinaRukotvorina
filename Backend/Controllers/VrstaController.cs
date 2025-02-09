using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public class VrstaController
    {
        [ApiController]
        [Route("api/v1/[controller]")]
        public class VrsteController : ControllerBase
        {
            private readonly BackendContext _context;

            public VrsteController(BackendContext context)
            {
                _context = context;
            }

            [HttpGet]
            public IActionResult Get()
            {
                try
                {
                    return Ok(_context.Vrste);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }



            [HttpGet]

            [Route("{sifra:int}")]

            public IActionResult GetBySifra(int sifra)
            {
                try
                {
                    var s = _context.Vrste.Find(sifra);
                    if (s == null)
                    {
                        return NotFound();
                    }
                    return Ok(s);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }


            [HttpPost]
            public IActionResult Post(Vrsta vrsta)
            {
                try
                {
                    _context.Vrste.Add(vrsta);
                    _context.SaveChanges();
                    return StatusCode(StatusCodes.Status201Created, vrsta);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }


            [HttpPut]
            [Route("{sifra:int}")]
            [Produces("application/json")]
            public IActionResult Put(int sifra, Vrsta vrsta)
            {
                try
                {

                    var s = _context.Vrste.Find(sifra);

                    if (s == null)
                    {
                        return NotFound();
                    }

                    // Rucno mapiranje, kasnije automapper
                    s.Sastav = vrsta.Sastav;
                   


                    _context.Vrste.Update(s);
                    _context.SaveChanges();
                    return Ok(new { poruka = "Uspješno promijenjeno" });
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }


            [HttpDelete]
            [Route("{sifra:int}")]
            public IActionResult Delete(int sifra)
            {
                try
                {
                    var s = _context.Vrste.Find(sifra);
                    if (s == null)
                    {
                        return NotFound();
                    }
                    _context.Vrste.Remove(s);
                    _context.SaveChanges();
                    return Ok(new { poruka = "Uspješno obrisano" });
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }

        }
    }
}
