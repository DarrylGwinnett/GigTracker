using System;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Queries;

public class GetGigList
{
    public class Query : IRequest<List<Gig>> { }

    public class Handler(AppDbContext context) : IRequestHandler<Query, List<Gig>>
    {
        public async Task<List<Gig>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Gigs.ToListAsync(cancellationToken);
        }
    }
}
