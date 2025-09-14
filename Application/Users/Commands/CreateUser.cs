using Application.Core;
using Application.Users.DTO;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
namespace Application.Users.Commands;

public class CreateUser
{
    public class Command : IRequest<Result<Unit>>
    {
        public required RegisterDTO registerDTO { get; set; }
    }

    public class Handler(SignInManager<User> signInManager) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = new User
            {
                DisplayName = request.registerDTO.DisplayName,
                Email = request.registerDTO.Email,
                UserName = request.registerDTO.Email
            };
            var result = await signInManager.UserManager.CreateAsync(user, request.registerDTO.Password);
            if (!result.Succeeded)
            {
                var errs = new Dictionary<string, string[]>();

                foreach (var error in result.Errors)
                {
                    // Map Identity error codes to DTO property names
                    var key = error.Code switch
                    {
                        "DuplicateUserName" or "InvalidUserName" => "registerDTO.Email",
                        "InvalidEmail" => "registerDTO.Email",
                        "PasswordTooShort" or "PasswordRequiresNonAlphanumeric" or "PasswordRequiresDigit" or "PasswordRequiresUpper" or "PasswordRequiresLower" => "registerDTO.Password",
                        _ => "registerDTO"
                    };

                    if (!errs.TryGetValue(key, out string[]? value))
                        errs[key] = [error.Description];
                    else
                        errs[key] = [.. value, error.Description];
                }

                return Result<Unit>.ValidationFailure(errs, 400);
            }
            return Result<Unit>.Success(Unit.Value);
        }
    }
}