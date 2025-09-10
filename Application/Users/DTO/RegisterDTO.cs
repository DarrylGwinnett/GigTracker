namespace Application.Users.DTO
{
    public class RegisterDTO
    {
        public required string DisplayName { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
