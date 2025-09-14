using Domain;
using Microsoft.AspNetCore.Identity;
namespace Persistence
{
    public static class Dbinitializer
    {
        public static async Task SeedData(AppDbContext dbContext, UserManager<User> userManager)
        {
            var users = new List<User>
                {
                    new() { DisplayName = "Bob", UserName = "bob@myfakedomain.dg", Email = "bob@myfakedomain.dg" },
                    new() { DisplayName = "Tim", UserName = "tim@myfakedomain.dg", Email = "tim@myfakedomain.dg" },
                    new() { DisplayName = "Darryl", UserName = "darryl@myfakedomain.dg", Email = "darryl@myfakedomain.dg" },
                };
            if (!userManager.Users.Any())
            {

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }


            if (dbContext.Gigs.Any()) return;

            var gigs = new List<Gig>
            {
                new() {
                    Title = "Past Activity 1",
                    Artist = "Iron Maiden",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    Genre = "drinks",
                    City = "London",
                    Venue = "The Lamb and Flag, 33, Rose Street, Seven Dials, Covent Garden, London, Greater London, England, WC2E 9EB, United Kingdom",
                    Latitude = 51.51171665,
                    Longitude = -0.1256611057818921,
                    Attendees = [new(){ UserId = users[0].Id, IsOrganizer = true }]

                },
                new() {
                    Title = "Past Activity 2",
                    Artist = "Gojira",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Activity 1 month ago",
                    Genre = "culture",
                    City = "Paris",
                    Venue = "Louvre Museum, Rue Saint-Honoré, Quartier du Palais Royal, 1st Arrondissement, Paris, Ile-de-France, Metropolitan France, 75001, France",
                    Latitude = 48.8611473,
                    Longitude = 2.33802768704666,
                    Attendees = [new(){ UserId = users[0].Id, IsOrganizer = true }]
                }
            };
            dbContext.AddRange(gigs);
            await dbContext.SaveChangesAsync();
        }
    }
}
