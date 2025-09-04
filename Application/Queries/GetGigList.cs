using System;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Queries;

public class GetGigList
{
    public class Query : IRequest<Result<List<Gig>>> { }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<List<Gig>>>
    {
        public async Task<Result<List<Gig>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var gigs =  await context.Gigs.ToListAsync(cancellationToken);
            return Result<List<Gig>>.Success(gigs);
        }
    }
}
