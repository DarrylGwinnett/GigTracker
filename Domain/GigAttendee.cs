namespace Domain
{
    public class GigAttendee
    {
        public required string UserId { get; set; }

        public User User { get; set; } = default!;

        public string? GigId { get; set; }

        public Gig Gig { get; set; } = null!;

        public bool IsOrganiser { get; set; }

        public DateTime DateJoined { get; set; } = DateTime.UtcNow;
    }
}
