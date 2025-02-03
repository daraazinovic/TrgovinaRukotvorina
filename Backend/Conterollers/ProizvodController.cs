using Backend.Data;
using Backend.Models;
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


        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            try
            {
                var s = _context.Proizvodi.Find(sifra);
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
        public IActionResult Post(Proizvod proizvod)
        {
            try
            {
                _context.Proizvodi.Add(proizvod);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, proizvod);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }



        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Proizvod proizvod)
        {
            try
            {

                var s = _context.Proizvodi.Find(sifra);

                if (s == null)
                {
                    return NotFound();
                }

                // Rucno mapiranje, kasnije automapper
                s.Naziv = proizvod.Naziv;
                s.IzradujeSeOd = proizvod.IzradujeSeOd;
                s.Cijena = proizvod.Cijena;
                s.Namjena = proizvod.Namjena;

                _context.Proizvodi.Update(s);
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
                var s = _context.Proizvodi.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Proizvodi.Remove(s);
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
