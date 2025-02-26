﻿using AutoMapper;
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
                return Ok(_mapper.Map<List<ProizvodDTORead>>(_context.Proizvodi.Include(m => m.Materijali)));
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

    }
}

