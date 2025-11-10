namespace Application.Gigs.DTO
{
    public class CommentDTO
    {           
        public string Id { get; set; } 

        public required string Body { get; set; }

        public DateTime CreatedAt { get; set; } 

        public required string UserId { get; set; }

        public required string DisplayName { get; set; }

        public string UserImageUrl { get; set; } = default!;
    }

}
