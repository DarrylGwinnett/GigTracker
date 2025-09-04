using System;
using System.Diagnostics;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Queries;

public class GetGigDetail
{
    public class Query : IRequest<Result<Gig>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<Gig>>
    {
        public async Task<Result<Gig>> Handle(Query request, CancellationToken cancellationToken)
        {
            var gig = await context.Gigs.FindAsync(request.Id, cancellationToken);

            if (gig == null)
            {
                return Result<Gig>.Failure("Gig not found", 404);
            }
            return Result<Gig>.Success(gig);
        }
    }

}
