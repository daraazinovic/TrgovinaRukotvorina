namespace Backend.Models
{
    public class Proizvod : Entitet
    {
        public int MyProperty { get; set; }
        public string Naziv { get; set; } = "";
        public string IzradujeSeOd { get; set; }
        public int Cijena { get; set; } 
        public string Namjena { get; set; } = "";
    }
}
