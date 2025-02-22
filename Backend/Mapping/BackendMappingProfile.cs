using AutoMapper;
using Backend.Models;
using Backend.Models.DTO;

namespace Backend.Mapping
{
    public class BackendMappingProfile :Profile
    {

        public BackendMappingProfile()
        {
            CreateMap<Proizvod, ProizvodDTORead>();
            CreateMap<Proizvod, ProizvodDTOInsertUpdate>();

            CreateMap<Vrsta, VrstaDTORead>();
            CreateMap<Vrsta, VrstaDTOInsertUpdate>();

            CreateMap<Materijal, MaterijalDTORead>()
                .ForCtorParam(
                "SastavNaziv",
                opt => opt.MapFrom(src => src.Vrsta.Sastav)
                );


        }
        
        
           
    }
}
