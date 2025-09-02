namespace Application.Gigs.DTO
{
    public class CreateGigDto
    {
        public string Title { get; set; } = "";

        public string Artist { get; set; } = "";

        public DateTime Date { get; set; }

        public string Description { get; set; } = "";

        public string Category { get; set; } = "";

        public string City { get; set; } = "";

        public string Venue { get; set; } = "";

        public double Latitude { get; set; }

        public double Longitude { get; set; }
    }
}
