using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class MaterijaliController : ControllerBase
    {
        private readonly BackendContext _context;

        public MaterijaliController(BackendContext context)
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
        public IActionResult Post(Materijali materijal)
        {
            try
            {
                _context.Materijali.Add(materijal);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Materijali materijal)
        {
            var m = _context.Materijali.Find(sifra);
            if (m == null)
            {
                return NotFound();
            }

            try
            {
                m.Naziv = materijal.Naziv;
                m.Vrsta = materijal.Vrsta;
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
