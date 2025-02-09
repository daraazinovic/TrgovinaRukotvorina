using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class MaterijalController : ControllerBase
    {
        private readonly BackendContext _context;

        public  MaterijalController(BackendContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Materijali);
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
                var s = _context.Materijali.Find(sifra);
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
        public IActionResult Post(Materijal materijal)
        {
            try
            {
                _context.Materijali.Add(materijal);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, materijal);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Materijal materijal)
        {
            try
            {

                var s = _context.Materijali.Find(sifra);

                if (s == null)
                {
                    return NotFound();
                }

                // Rucno mapiranje, kasnije automapper
                s.Naziv = materijal.Naziv;
                s.Vrsta = materijal.Vrsta;
               

                _context.Materijali.Update(s);
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
                var s = _context.Materijali.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Materijali.Remove(s);
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
