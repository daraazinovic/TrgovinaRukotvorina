using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public record MaterijalDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
        string Naziv,
        [Required(ErrorMessage = "Vrsta obavezna")]
        int VrstaSifra
        
    );

}
