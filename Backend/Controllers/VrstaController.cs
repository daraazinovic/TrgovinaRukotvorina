using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers

{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class VrstaController(BackendContext context, IMapper mapper) : BackendController(context, mapper)
    {
        
        


            [HttpGet]
            public ActionResult<List<VrstaDTORead>> Get()
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { poruka = ModelState });
                }
                try
                {
                    return Ok(_mapper.Map<List<VrstaDTORead>>(_context.Vrste));
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
            }


            [HttpGet]

            [Route("{sifra:int}")]

           

       

        public ActionResult<VrstaDTORead> GetBySifra(int sifra)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { poruka = ModelState });
                }
                Vrsta? e;
                try
                {
                    e = _context.Vrste.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Vrsta ne postoji u bazi" });
                }
                return Ok(_mapper.Map<VrstaDTORead>(e));
            }


            [HttpPost]
            public IActionResult Post(VrstaDTOInsertUpdate dto)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { poruka = ModelState });
                }
                try
                {
                    var e = _mapper.Map<Vrsta>(dto);
                    _context.Vrste.Add(e);
                    _context.SaveChanges();
                    return StatusCode(StatusCodes.Status201Created, _mapper.Map<VrstaDTORead>(e));
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
            }



            [HttpPut]
            [Route("{sifra:int}")]
            [Produces("application/json")]
            public IActionResult Put(int sifra, VrstaDTOInsertUpdate dto)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);

                }
                try
                {
                    Vrsta? e;
                    try
                    {
                        e = _context.Vrste.Find(sifra);
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(new { poruka = ex.Message });
                    }
                    if (e == null)
                    {
                        return NotFound(new { poruka = "Vrsta ne postoji u bazi" });
                    }

                    e = _mapper.Map(dto, e);

                    _context.Vrste.Update(e);
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
                    Vrsta? e;
                    try
                    {
                        e = _context.Vrste.Find(sifra);
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(new { poruka = ex.Message });
                    }
                    if (e == null)
                    {
                        return NotFound("Vrsta ne postoji u bazi");
                    }
                    _context.Vrste.Remove(e);
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
