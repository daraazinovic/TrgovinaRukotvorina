using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public record ProizvodDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
        string Naziv,
        string IzradujeSeOd,
        [Range(0, 1000, ErrorMessage = "Vrijednost {0} mora biti između {1} i {2}")]
        int Cijena,
        string Namjena
 


        );
    
}
