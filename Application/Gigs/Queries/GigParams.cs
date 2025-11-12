using Application.Core;
namespace Application.Gigs.Queries
{
    public class GigParams : PaginationParams<DateTime?>
    {
        public string? Filter { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
    }
}
