using Application.Core;
using Application.Gigs.DTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;

namespace Application.Gigs.Queries;

public class GetGigList
{
    public class Query : IRequest<Result<List<GigDto>>> { }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<GigDto>>>
    {
        public async Task<Result<List<GigDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var gigs =  await context.Gigs
                  .ProjectTo<GigDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
            return Result<List<GigDto>>.Success(gigs);
        }
    }
}
