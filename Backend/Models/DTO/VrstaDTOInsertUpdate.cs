using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public record VrstaDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
        string Sastav


        );

  

}
