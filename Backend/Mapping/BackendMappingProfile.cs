using Backend.Models;

namespace Backend.Mapping
{
    public class BackendMappingProfile : Profile
    {

        public BackendMappingProfile()
        {
            CreateMap<Proizvod, ProizvodDTORead>();
            CreateMap<ProizvodDTOCreate, Proizvod>();

            CreateMap<Materijal, MaterijalDTORead>()
                .ForCtorParam(
                "Sastav",
                opt => opt.MapFrom(src => src.)
        }
    }
}
