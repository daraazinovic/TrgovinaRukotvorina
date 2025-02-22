using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Materijal : Entitet
    {
        public string Naziv { get; set; } = "";
        [ForeignKey("Vrsta")]
        public int Vrsta { get; set; } 
      
    }
}
