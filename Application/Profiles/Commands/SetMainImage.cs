using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Profiles.Commands
{
    public class SetMainImage
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string ImageId { get; set; }
        }

        public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();
                var image = context.UserImages.Where(x => x.Id == request.ImageId).Single();
                if (image.Url == user.ImageUrl) return Result<Unit>.Failure("Image is already main image", 400);
                user.ImageUrl = image.Url;
                context.UserImages.Remove(image);
                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                return result
                  ? Result<Unit>.Success(Unit.Value)
                  : Result<Unit>.Failure("Problem updating main image", 400);
            }
        }
    }
}