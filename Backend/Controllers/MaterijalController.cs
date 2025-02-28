using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Linq.Expressions;
using System.Text.RegularExpressions;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class MaterijalController(BackendContext context, IMapper mapper) : BackendController(context, mapper)
    {


        [HttpGet]
        public ActionResult<List<MaterijalDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<MaterijalDTORead>>(_context.Materijali.Include(m => m.Vrsta)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }



        [HttpGet]

        [Route("{sifra:int}")]

        public ActionResult<MaterijalDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Materijal? e;
            try
            {
                e = _context.Materijali.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Materijal ne postoji u bazi" });
            }
            return Ok(_mapper.Map<MaterijalDTORead>(e));
        }


        [HttpPost]
        public IActionResult Post(MaterijalDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            Vrsta? es;
            try
            {
                es = _context.Vrste.Find(dto.VrstaSifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (es == null)
            {
                return NotFound(new { poruka = "Vrsta u materijalima ne postoji u bazi" });
            }

            try
            {
                var e = _mapper.Map<Materijal>(dto);
                e.Vrsta = es;
                _context.Materijali.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<MaterijalDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }


        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, MaterijalDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }
            try
            {
                Materijal? e;
                try
                {
                    e = _context.Materijali.Find(sifra);
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

                _context.Materijali.Update(e);
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
                Materijal? e;
                try
                {
                    e = _context.Materijali.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Materijal ne postoji u bazi");
                }
                _context.Materijali.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }



        [HttpGet]
        [Route("Proizvodi/{sifraMaterijeli:int}")]
        public ActionResult<List<ProizvodDTORead>> GetProizvodi(int sifraMaterijali)
        {
            if (!ModelState.IsValid || sifraMaterijali <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var p = _context.Materijali
                    .Include(i => i.Proizvodi).FirstOrDefault(x => x.Sifra == sifraMaterijali);
                if (p == null)
                {
                    return BadRequest("Ne postoji materijal s šifrom " + sifraMaterijali + " u bazi");
                }

                return Ok(_mapper.Map<List<ProizvodDTORead>>(p.Proizvodi));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }



        [HttpPost]
        [Route("{sifra:int}/dodaj/{materijalSifra:int}")]
        public IActionResult DodajMaterijal(int sifra, int materijalSifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (sifra <= 0 || materijalSifra <= 0)
            {
                return BadRequest("Šifra materijala ili proizvoda nije dobra");
            }
            try
            {
                var proizvod = _context.Proizvodi
                    .Include(g => g.Materijali)
                    .FirstOrDefault(g => g.Sifra == sifra);
                if (proizvod == null)
                {
                    return BadRequest("Ne postoji proizvod s šifrom " + sifra + " u bazi");
                }
                var materijal = _context.Materijali.Find(materijalSifra);
                if (materijal == null)
                {
                    return BadRequest("Ne postoji materijal s šifrom " + materijalSifra + " u bazi");
                }
                proizvod.Materijali.Add(materijal);
                _context.Proizvodi.Update(proizvod);
                _context.SaveChanges();
                return Ok(new
                {
                    poruka = "Proizvod " + proizvod.Naziv + " dodan na materijal "
                 + materijal.Naziv
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
        [Route("{sifra:int}/obrisi/{materijalSifra:int}")]
        public IActionResult ObrisiMaterijal(int sifra, int materijalSifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (sifra <= 0 || materijalSifra <= 0)
            {
                return BadRequest("Šifra materijala ili proizvoda nije dobra");
            }
            try
            {
                var proizvod = _context.Proizvodi
                    .Include(g => g.Materijali)
                    .FirstOrDefault(g => g.Sifra == sifra);
                if (proizvod == null)
                {
                    return BadRequest("Ne postoji proizvod s šifrom " + sifra + " u bazi");
                }
                var materijal = _context.Materijali.Find(materijalSifra);
                if (materijal == null)
                {
                    return BadRequest("Ne postoji proizvod s šifrom " + materijalSifra + " u bazi");
                }
                proizvod.Materijali.Remove(materijal);
                _context.Proizvodi.Update(proizvod);
                _context.SaveChanges();

                return Ok(new
                {
                    poruka = "Materijal " + materijal.Naziv + " obrisan iz proizvoda "
                 + proizvod.Naziv
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });

            }
        }

    }
}
