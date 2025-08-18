using System;
using System.Diagnostics;
using Domain;
using MediatR;
using Persistence;

namespace Application.Queries;

public class GetGigDetail
{
    public class Query : IRequest<Gig>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Gig>
    {
        public async Task<Gig> Handle(Query request, CancellationToken cancellationToken)
        {
            var gig = await context.Gigs.FindAsync(request.Id, cancellationToken);

            if (gig == null)
            {
                throw new Exception("");
            }
            return gig;
        }
    }

}
