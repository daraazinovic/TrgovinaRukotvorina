using AutoMapper;
using Backend.Models;
using Backend.Models.DTO;
using System.Text.RegularExpressions;

namespace Backend.Mapping
{
    public class BackendMappingProfile :Profile
    {

        public BackendMappingProfile()
        {
            CreateMap<Proizvod, ProizvodDTORead>();
            CreateMap<ProizvodDTOInsertUpdate, Proizvod>();

            CreateMap<Vrsta, VrstaDTORead>();
            CreateMap<VrstaDTOInsertUpdate, Vrsta>();

            CreateMap<Materijal, MaterijalDTORead>()
                .ForCtorParam(
                "SastavNaziv",
                opt => opt.MapFrom(src => src.Vrsta.Sastav)
            );

            CreateMap<Materijal, MaterijalDTOInsertUpdate>().ForMember(
                    dest => dest.VrstaSifra,
                    opt => opt.MapFrom(src => src.Vrsta.Sifra)
                );
            CreateMap<MaterijalDTOInsertUpdate, Materijal>();

        }
           
    }
}
