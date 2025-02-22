

namespace Backend.Models.DTO

{
    public record ProizvodDTORead(
        int Sifra,
        string Naziv,
        string IzradujeSeOd,
        int CijenaProizvoda,
        string Namjena
        
    );

}
