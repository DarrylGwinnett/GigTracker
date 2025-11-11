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
            string? currentUserId = null;
            CreateMap<Gig, Gig>();
            CreateMap<CreateGigDto, Gig>();
            CreateMap<EditGigDto, Gig>();
            CreateMap<Gig, GigDto>()
                .ForMember(d => d.OrganiserDisplayName, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsOrganiser)!.User.DisplayName))
                .ForMember(d => d.OrganiserId, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsOrganiser)!.User.Id));
            CreateMap<GigAttendee, UserProfile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
                .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl))
                .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id))
                .ForMember(d => d.Following, o => o.MapFrom(s => s.User.Followers.Any(x => x.ObserverId == currentUserId)))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.User.Followers.Count()))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.User.Followings.Count()));
            CreateMap<User, UserProfile>()
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count()))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count()))
                .ForMember(d => d.Following, o => o.MapFrom(s => s.Followers.Any(x=> x.ObserverId == currentUserId)));
            CreateMap<Comment, CommentDTO>()
                .ForMember(d => d.UserImageUrl, o => o.MapFrom(s => s.User.ImageUrl))
                .ForMember(d => d.UserId, o => o.MapFrom(s => s.User.Id))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName));
        }
    }
}
