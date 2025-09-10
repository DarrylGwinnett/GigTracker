using Application.Users.Commands;
using FluentValidation;

namespace Application.Users.Validators
{
    public class RegisterUserValidator : AbstractValidator<CreateUser.Command>
    {
        public RegisterUserValidator()
        {
            RuleFor(x => x.registerDTO.DisplayName).NotEmpty().WithMessage("Username is required.");
            RuleFor(x => x.registerDTO.Email).EmailAddress().WithMessage("A valid email is required.");
            RuleFor(x => x.registerDTO.Password).NotEmpty().WithMessage("Password is required.").MinimumLength(6).WithMessage("Password must be at least 6 characters long.");
        }
    }
}

