using System.Text.Json.Serialization;

namespace Domain
{
    public class Image
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public required string Url { get; set; }

        public required string PublicId { get; set; }

        [JsonIgnore]
        public User User { get; set; } = default!;

        public required string UserId {  get; set; }
    }
}
