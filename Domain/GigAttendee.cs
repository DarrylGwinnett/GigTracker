namespace Domain
{
    public class GigAttendee
    {
        public string UserId { get; set; }

        public User User { get; set; }

        public string? GigId { get; set; }

        public Gig Gig { get; set; } = null!;

        public bool IsOrganizer { get; set; }

        public DateTime DateJoined { get; set; } = DateTime.UtcNow;
    }
}
