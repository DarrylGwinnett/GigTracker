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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<GigAttendee>(x => x.HasKey(a => new { a.GigId, a.UserId }));
            builder.Entity<GigAttendee>().HasOne(x => x.User).WithMany(x => x.Gigs).HasForeignKey(x => x.UserId);
            builder.Entity<GigAttendee>().HasOne(x => x.Gig).WithMany(x => x.Attendees).HasForeignKey(x => x.GigId);
        }
    }
}
