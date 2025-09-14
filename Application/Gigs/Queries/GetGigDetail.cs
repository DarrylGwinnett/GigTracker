using Application.Core;
using Application.Gigs.DTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Gigs.Queries;

public class GetGigDetail
{
    public class Query : IRequest<Result<GigDto>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<GigDto>>
    {
        public async Task<Result<GigDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var gig = await context.Gigs
                .ProjectTo<GigDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => request.Id == x.Id);

            if (gig == null)
            {
                return Result<GigDto>.Failure("Gig not found", 404);
            }
            return Result<GigDto>.Success(gig);
        }
    }

}
