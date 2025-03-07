﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Proizvod : Entitet
    {
        
        public string Naziv { get; set; } = "";
        public string IzradujeSeOd { get; set; }
        public int Cijena { get; set; } 
        public string Namjena { get; set; } = "";

        public ICollection<Materijal>? Materijali { get; set; }
    }
}
