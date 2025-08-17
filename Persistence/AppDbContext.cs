using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Gig> Gigs { get; set; }
    }
}
