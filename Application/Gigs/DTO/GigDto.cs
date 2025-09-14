using Application.Profiles.DTO;
namespace Application.Gigs.DTO
{
    public class GigDto
    {
        public required string Id { get; set; }

        public required string Title { get; set; }

        public required string Artist { get; set; }

        public DateTime Date { get; set; }

        public required string Description { get; set; }

        public required string Genre { get; set; }

        public required string City { get; set; }

        public bool IsCancelled { get; set; }

        public required string OrganiserDisplayName { get; set; }


        public required string OrganiserId { get; set; }

        public required string Venue { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public ICollection<UserProfile> Attendees { get; set; } = [];
    }
}
