using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries
{
    public class GetUserImages
    {
        public class Query : IRequest<Result<List<Image>>>
        {
            public required string UserId {  get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<Image>>>
        {
            public async Task<Result<List<Image>>>Handle(Query request, CancellationToken cancellationToken)
            {
                var images = await context.Users.Where(x => x.Id == request.UserId).SelectMany(x => x.UserImages).ToListAsync(cancellationToken);
                return Result<List<Image>>.Success(images);
            }
        }
    }
}
