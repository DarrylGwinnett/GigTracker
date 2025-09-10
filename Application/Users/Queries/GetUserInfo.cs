using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Gigs.Queries;

public class GetUserInfo
{
    public class Query : IRequest<Result<User>>
    {
        public required string Username { get; set; }
    }

    public class Handler(SignInManager<User> signinManager) : IRequestHandler<Query, Result<User>>
    {
        public async Task<Result<User>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await signinManager.UserManager.FindByNameAsync(request.Username);
            if (user == null)
            {
                return Result<User>.Failure("User is not signed in", 401);
            }
            return Result<User>.Success(user);


        }
    }

}
