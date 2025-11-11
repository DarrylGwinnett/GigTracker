namespace Domain
{
    public class Gig
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public required string Title {  get; set; }

        public required string Artist { get; set; }

        public DateTime Date { get; set; }

        public required string Description { get; set; }

        public required string Genre { get; set; }

        public required string City { get; set; }

        public bool IsCancelled {  get; set; }

        public required string Venue { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public ICollection<GigAttendee> Attendees { get; set; } = [];

        public ICollection<Comment> Comments { get; set; } = [];
    }
}
