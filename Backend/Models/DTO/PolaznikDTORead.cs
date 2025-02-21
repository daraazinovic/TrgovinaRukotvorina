

namespace Backend.Models.DTO

{
    public record PolaznikDTORead(
        int Sifra,
        string Naziv,
        string IzradujeSeOd,
        int CijenaProizvoda,
        string Namjena
        
    );

}
