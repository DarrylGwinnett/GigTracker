using Application.Gigs.DTO;
using Application.Profiles.DTO;
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
            CreateMap<Gig, GigDto>()
                .ForMember(d => d.OrganiserDisplayName, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsOrganizer)!.User.DisplayName));
            CreateMap<Gig, GigDto>()
                .ForMember(d => d.OrganiserId, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsOrganizer)!.User.Id));
            CreateMap<GigAttendee, UserProfile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
                .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl))
                .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id));
        }
    }
}
