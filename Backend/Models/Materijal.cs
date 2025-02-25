using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace Backend.Models
{
    public class Materijal : Entitet
    {
        public string Naziv { get; set; } = "";
        [ForeignKey("vrsta")]
        public Vrsta Vrsta { get; set; }

        public ICollection<Proizvod>? Proizvodi { get; } = [];

    }
}
