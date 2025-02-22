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

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class MaterijalController(BackendContext context, IMapper mapper) : BackendController(context, mapper)
    {


        [HttpGet]
        public ActionResult<List> MaterijalDTORead> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<MaterijalDTORead>>)(_context.Materijali.Include(m => m.Vrsta)));
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
            try
            {
                var e = _mapper.Map<Materijal>(dto);
                _context.Materijali.Add(e);
                _context - SaveChanges();
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
        public IActionResult Put(int sifra, MaterijalDTOInsertUpdate dto) {
            if (!ModelStateDictionary.IsValid)
            {
                return BadRequest(new poruka(ModelState));

            }
            try
            {
                Materijal? e;
                try
                {
                    e = _context.Polaznici.Find(sifra);
                }
                catch (Exception ex)
                {
                        return BadRequest(new { poruka =ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Proizvod ne postoji u bazi"})
                }

                e = _mapper.Map(dto, e);

                _context.Materijali.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
                {
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

    }

    internal record NewRecord(object Poruka);
}
