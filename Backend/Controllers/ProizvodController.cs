using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]

    public class ProizvodController(BackendContext context, IMapper mapper) : BackendController(context, mapper)
    {

        [HttpGet]
        public ActionResult<List<ProizvodDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<ProizvodDTORead>>(_context.Proizvodi));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }





        [HttpGet]

        [Route("{sifra:int}")]

        public ActionResult<ProizvodDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Proizvod? e;
            try
            {
                e = _context.Proizvodi.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Proizvod ne postoji u bazi" });
            }
            return Ok(_mapper.Map<ProizvodDTORead>(e));
        }



        [HttpPost]
        public IActionResult Post(ProizvodDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _mapper.Map<Proizvod>(dto);
                _context.Proizvodi.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<ProizvodDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }



        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, ProizvodDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }
            try
            {
                Proizvod? e;
                try
                {
                    e = _context.Proizvodi.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Proizvod ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);

                _context.Proizvodi.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }



        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Proizvod? e;
                try
                {
                    e = _context.Proizvodi.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Proizvod ne postoji u bazi");
                }
                _context.Proizvodi.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }



        [HttpGet]
        [Route("Materijali/{proizvodSifra:int}")]
        public ActionResult<List<MaterijalDTORead>> GetMaterijali(int proizvodSifra)
        {
            if (!ModelState.IsValid || proizvodSifra <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var p = _context.Proizvodi
                    .Include(i => i.Materijali).FirstOrDefault(x => x.Sifra == proizvodSifra);
                if (p == null)
                {
                    return BadRequest("Ne postoji proizvod s šifrom " + proizvodSifra + " u bazi");
                }

                return Ok(_mapper.Map<List<MaterijalDTORead>>(p.Materijali));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }



        [HttpPost]
        [Route("{sifra:int}/dodaj/{proizvodSifra:int}")]
        public IActionResult DodajProizvod(int sifra, int proizvodSifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (sifra <= 0 || proizvodSifra <= 0)
            {
                return BadRequest("Šifra materijala ili proizvoda nije dobra");
            }
            try
            {
                var materijal = _context.Materijali
                    .Include(g => g.Proizvodi)
                    .FirstOrDefault(g => g.Sifra == sifra);
                if (materijal == null)
                {
                    return BadRequest("Ne postoji materijal s šifrom " + sifra + " u bazi");
                }
                var proizvod = _context.Proizvodi.Find(proizvodSifra);
                if (proizvod == null)
                {
                    return BadRequest("Ne postoji proizvod s šifrom " + proizvodSifra + " u bazi");
                }
                materijal.Proizvodi.Add(proizvod);
                _context.Materijali.Update(materijal);
                _context.SaveChanges();
                return Ok(new
                {
                    poruka = "Materijal " + materijal.Naziv + " dodan na proizvod "
                 + proizvod.IzradujeSeOd
                });
            }
            catch (Exception ex)
            {
                return StatusCode(
                       StatusCodes.Status503ServiceUnavailable,
                       ex.Message);
            }

        }




        [HttpDelete]
        [Route("{sifra:int}/obrisi/{proizvodSifra:int}")]
        public IActionResult ObrisiProizvod(int sifra, int proizvodSifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (sifra <= 0 || proizvodSifra <= 0)
            {
                return BadRequest("Šifra materijala ili proizvoda nije dobra");
            }
            try
            {
                var materijal = _context.Materijali
                    .Include(g => g.Proizvodi)
                    .FirstOrDefault(g => g.Sifra == sifra);
                if (materijal == null)
                {
                    return BadRequest("Ne postoji materijal s šifrom " + sifra + " u bazi");
                }
                var proizvod = _context.Proizvodi.Find(proizvodSifra);
                if (proizvod == null)
                {
                    return BadRequest("Ne postoji proizvod s šifrom " + proizvodSifra + " u bazi");
                }
                materijal.Proizvodi.Remove(proizvod);
                _context.Materijali.Update(materijal);
                _context.SaveChanges();

                return Ok(new
                {
                    poruka = "Matrijal " + materijal.Naziv + " obrisan iz proizvoda "
                 + proizvod.IzradujeSeOd
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });

            }
        }

    }
}
       
        
    


