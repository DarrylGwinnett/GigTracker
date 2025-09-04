using Application.Gigs.DTO;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Gig, Gig>();
            CreateMap<CreateGigDto, Gig>();
            CreateMap<EditGigDto, Gig>();
        }
    }
}
