using Microsoft.AspNetCore.Identity;
namespace Domain
{
    public class User : IdentityUser
    {
        public string? DisplayName { get; set; }

        public string? Bio { get; set; }

        public string? ImageUrl { get; set; }

        public ICollection<GigAttendee> Gigs { get; set; } = [];

        public ICollection<Image> UserImages { get; set; } = [];

        public ICollection<UserFollowing> Followings { get; set; } = [];

        public ICollection<UserFollowing> Followers { get; set; } = [];
    }
}
