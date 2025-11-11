using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
    {
        public required DbSet<Gig> Gigs { get; set; }
        public required DbSet<GigAttendee> GigAttendees { get; set; }
        public required DbSet<Image> UserImages { get; set; }
        public required DbSet<Comment> Comments { get; set; }
        public required DbSet<UserFollowing> UserFollowings { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<GigAttendee>(x => x.HasKey(a => new { a.GigId, a.UserId }));
            builder.Entity<GigAttendee>().HasOne(x => x.User).WithMany(x => x.Gigs).HasForeignKey(x => x.UserId);
            builder.Entity<GigAttendee>().HasOne(x => x.Gig).WithMany(x => x.Attendees).HasForeignKey(x => x.GigId);
            builder.Entity<UserFollowing>(x =>
            {
                x.HasKey(k => new { k.ObserverId, k.TargetId });
                x.HasOne(O => O.Observer).WithMany(F => F.Followings)
                .HasForeignKey(O=>O.ObserverId)
                .OnDelete(DeleteBehavior.Cascade);

                x.HasOne(O => O.Target).WithMany(F => F.Followers)
                   .HasForeignKey(O => O.TargetId)
                   .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
