using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string UserId { get; set; }
        }

        public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await userAccessor.GetUserAsync();
                var target = await context.Users.FindAsync(request.UserId);
                if (target == null) { return Result<Unit>.Failure("Could not find user to follow", 404); }
                var following = await context.UserFollowings.FindAsync([observer.Id, target.Id], cancellationToken);
                if (following is null)
                {
                    var newFollowing = new UserFollowing() { ObserverId = observer.Id, TargetId = target.Id };
                    context.UserFollowings.Add(newFollowing);
                }
                else
                {
                    context.UserFollowings.Remove(following);
                }
                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                return result
                  ? Result<Unit>.Success(Unit.Value)
                  : Result<Unit>.Failure("Problem toggling follower", 400);
            }
        }
    }
}
