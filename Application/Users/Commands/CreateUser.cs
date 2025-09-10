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
              var errs = result.Errors.ToArray().Select(e => e.Description); 
                return Result<Unit>.Failure(errs, 400);
            }
            return Result<Unit>.Success(Unit.Value);
        }
    }
}