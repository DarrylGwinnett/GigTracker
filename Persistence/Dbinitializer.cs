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
            var random = new Random();

            List<(string City, string Venue, double Lat, double Lng)> venues = new()
            {
                ("London", "O2 Arena, London", 51.503038, 0.003154),
                ("Nottingham", "Rock City, Talbot Street, Nottingham", 52.956525, -1.156892),
                ("Manchester", "AO Arena, Manchester", 53.488396, -2.243828),
                ("Birmingham", "Utilita Arena, Birmingham", 52.478174, -1.915525),
                ("Sheffield", "O2 Academy Sheffield", 53.378384, -1.472202),
                ("Bristol", "O2 Academy Bristol", 51.455608, -2.598436),
                ("Glasgow", "O2 Academy Glasgow", 55.849702, -4.269633),
                ("Leeds", "O2 Academy Leeds", 53.801932, -1.547883)
            };

            // Helper function to generate attendees
            List<GigAttendee> RandomAttendees()
            {
                var organiserIndex = random.Next(users.Count);
                var attendees = new List<GigAttendee>
                {
                    new() { UserId = users[organiserIndex].Id, IsOrganiser = true }
                };

                // Randomly add 1–4 more attendees
                var additionalCount = random.Next(1, 5);
                var shuffledUsers = users.OrderBy(_ => random.Next()).ToList();

                foreach (var user in shuffledUsers.Take(additionalCount))
                {
                    if (user.Id != users[organiserIndex].Id)
                        attendees.Add(new() { UserId = user.Id, IsOrganiser = false });
                }

                return attendees;
            }

            var gigs = new List<Gig>(){
    // --- Past Gigs ---
    new() {
        Title = "Iron Maiden – Legacy of the Beast Tour",
        Artist = "Iron Maiden",
        Date = DateTime.UtcNow.AddMonths(-3),
        Description = "A massive production with pyrotechnics and decades of metal anthems at London’s O2 Arena.",
        Genre = "Heavy Metal",
        City = venues[0].City,
        Venue = venues[0].Venue,
        Latitude = venues[0].Lat,
        Longitude = venues[0].Lng,
        Attendees = RandomAttendees()
    },
    new() {
        Title = "Gojira – Fortitude World Tour",
        Artist = "Gojira",
        Date = DateTime.UtcNow.AddMonths(-2),
        Description = "Gojira’s technical riffs and environmental themes shook Rock City to its core.",
        Genre = "Heavy Metal",
        City = venues[1].City,
        Venue = venues[1].Venue,
        Latitude = venues[1].Lat,
        Longitude = venues[1].Lng,
        Attendees = RandomAttendees()
    },
    new() {
        Title = "Parkway Drive – Darker Still Tour",
        Artist = "Parkway Drive",
        Date = DateTime.UtcNow.AddMonths(-1).AddDays(-5),
        Description = "Parkway Drive brought arena-level energy to an intimate Nottingham crowd.",
        Genre = "Metalcore",
        City = venues[1].City,
        Venue = venues[1].Venue,
        Latitude = venues[1].Lat,
        Longitude = venues[1].Lng,
        Attendees = RandomAttendees()
    },
    new() {
        Title = "Mastodon – Hushed and Grim UK Tour",
        Artist = "Mastodon",
        Date = DateTime.UtcNow.AddMonths(-1).AddDays(-12),
        Description = "A hypnotic, crushing set from Mastodon featuring tracks from ‘Hushed and Grim’.",
        Genre = "Progressive Metal",
        City = venues[0].City,
        Venue = venues[0].Venue,
        Latitude = venues[0].Lat,
        Longitude = venues[0].Lng,
        Attendees = RandomAttendees()
    },
        new() {
        Title = "Mastodon – Hushed and Grim UK Tour",
        Artist = "Mastodon",
        Date = DateTime.UtcNow.AddMonths(-1).AddDays(-11),
        Description = "A hypnotic, crushing set from Mastodon featuring tracks from ‘Hushed and Grim’.",
        Genre = "Progressive Metal",
        City = venues[1].City,
        Venue = venues[1].Venue,
        Latitude = venues[1].Lat,
        Longitude = venues[1].Lng,
        Attendees = RandomAttendees()
    },
            new() {
        Title = "Mastodon – Hushed and Grim UK Tour",
        Artist = "Mastodon",
        Date = DateTime.UtcNow.AddMonths(-1).AddDays(-9),
        Description = "A hypnotic, crushing set from Mastodon featuring tracks from ‘Hushed and Grim’.",
        Genre = "Progressive Metal",
        City = venues[2].City,
        Venue = venues[2].Venue,
        Latitude = venues[2].Lat,
        Longitude = venues[2].Lng,
        Attendees = RandomAttendees()
    },
    new() {
        Title = "Electric Callboy – Tekkno UK Tour",
        Artist = "Electric Callboy",
        Date = DateTime.UtcNow.AddMonths(-1).AddDays(-7),
        Description = "A full-on metalcore rave with confetti cannons and synths galore at Rock City.",
        Genre = "Metalcore",
        City = venues[1].City,
        Venue = venues[1].Venue,
        Latitude = venues[1].Lat,
        Longitude = venues[1].Lng,
        Attendees = RandomAttendees()
    },
    new() {
        Title = "Make Them Suffer – Doomswitch Tour",
        Artist = "Make Them Suffer",
        Date = DateTime.UtcNow.AddMonths(-1).AddDays(-6),
        Description = "Melodic brutality and emotional intensity filled Nottingham’s Rock City.",
        Genre = "Metalcore",
        City = venues[1].City,
        Venue = venues[1].Venue,
        Latitude = venues[1].Lat,
        Longitude = venues[1].Lng,
        Attendees = RandomAttendees()
    },
    new() {
        Title = "Def Leppard – Hysteria Reloaded",
        Artist = "Def Leppard",
        Date = DateTime.UtcNow.AddMonths(-1).AddDays(-8),
        Description = "A nostalgic night of rock classics at the Utilita Arena in Birmingham.",
        Genre = "Hard Rock",
        City = venues[3].City,
        Venue = venues[3].Venue,
        Latitude = venues[3].Lat,
        Longitude = venues[3].Lng,
        Attendees = RandomAttendees()
    },
    new() {
        Title = "Slipknot – The End, So Far Tour",
        Artist = "Slipknot",
        Date = DateTime.UtcNow.AddMonths(-1).AddDays(-12),
        Description = "Masks, chaos, and metal perfection at O2 Arena London.",
        Genre = "Nu Metal",
        City = venues[0].City,
        Venue = venues[0].Venue,
        Latitude = venues[0].Lat,
        Longitude = venues[0].Lng,
        Attendees = RandomAttendees()
    },
    new() {
        Title = "Trivium – Deadmen and Dragons Tour",
        Artist = "Trivium",
        Date = DateTime.UtcNow.AddMonths(-2).AddDays(-3),
        Description = "Trivium tore through their greatest hits in front of a roaring Manchester crowd.",
        Genre = "Metalcore",
        City = venues[2].City,
        Venue = venues[2].Venue,
        Latitude = venues[2].Lat,
        Longitude = venues[2].Lng,
        Attendees = RandomAttendees()
    },

    // --- Upcoming Gigs ---
    new() {
        Title = "Architects – The Classic Symptoms Tour",
        Artist = "Architects",
        Date = DateTime.UtcNow.AddMonths(1),
        Description = "Architects return to Manchester Academy with a mix of new and classic material.",
        Genre = "Metalcore",
        City = venues[2].City,
        Venue = "Manchester Academy",
        Latitude = 53.466444,
        Longitude = -2.232303,
        Attendees = RandomAttendees()
    },
    new() {
        Title = "While She Sleeps – Sleeps Society Tour",
        Artist = "While She Sleeps",
        Date = DateTime.UtcNow.AddMonths(2),
        Description = "Sheffield’s own heroes headline the O2 Academy for a hometown blowout.",
        Genre = "Metalcore",
        City = venues[4].City,
        Venue = venues[4].Venue,
        Latitude = venues[4].Lat,
        Longitude = venues[4].Lng,
        Attendees = RandomAttendees()
    },
    new() {
        Title = "Polaris – Fatalism European Tour",
        Artist = "Polaris",
        Date = DateTime.UtcNow.AddMonths(2).AddDays(5),
        Description = "Australian metalcore outfit Polaris bring ‘Fatalism’ to the Bristol O2 Academy.",
        Genre = "Metalcore",
        City = venues[5].City,
        Venue = venues[5].Venue,
        Latitude = venues[5].Lat,
        Longitude = venues[5].Lng,
        Attendees = RandomAttendees()
    },
    new() {
        Title = "August Burns Red – Rescue & Restore 10th Anniversary",
        Artist = "August Burns Red",
        Date = DateTime.UtcNow.AddMonths(3),
        Description = "August Burns Red celebrate a decade of ‘Rescue & Restore’ in London.",
        Genre = "Metalcore",
        City = venues[0].City,
        Venue = "O2 Forum Kentish Town, London",
        Latitude = 51.553431,
        Longitude = -0.142455,
        Attendees = RandomAttendees()
    },
    new() {
        Title = "Bleed From Within – Shrine Tour",
        Artist = "Bleed From Within",
        Date = DateTime.UtcNow.AddMonths(2).AddDays(12),
        Description = "Glasgow’s own Bleed From Within headline their biggest hometown show yet.",
        Genre = "Metalcore",
        City = venues[6].City,
        Venue = venues[6].Venue,
        Latitude = venues[6].Lat,
        Longitude = venues[6].Lng,
        Attendees = RandomAttendees()
    },
    new() {
        Title = "Bury Tomorrow – The Seventh Sun Tour",
        Artist = "Bury Tomorrow",
        Date = DateTime.UtcNow.AddMonths(3).AddDays(4),
        Description = "Bury Tomorrow bring crushing riffs and melodic choruses to Leeds.",
        Genre = "Metalcore",
        City = venues[7].City,
        Venue = venues[7].Venue,
        Latitude = venues[7].Lat,
        Longitude = venues[7].Lng,
        Attendees = RandomAttendees()
    },
    new() {
        Title = "Northlane – Mirror’s Edge UK Tour",
        Artist = "Northlane",
        Date = DateTime.UtcNow.AddMonths(3).AddDays(10),
        Description = "Australian modern metalcore act Northlane return with a genre-bending show at O2 Academy Birmingham.",
        Genre = "Metalcore",
        City = venues[3].City,
        Venue = venues[3].Venue,
        Latitude = venues[3].Lat,
        Longitude = venues[3].Lng,
        Attendees = RandomAttendees()
    }
};
            dbContext.AddRange(gigs);
            await dbContext.SaveChangesAsync();
        }
    }
}
