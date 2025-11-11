using Application.Core;
using Application.Gigs.DTO;
using Application.Interfaces;
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

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<List<GigDto>>>
    {
        public async Task<Result<List<GigDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var gigs =  await context.Gigs
                  .ProjectTo<GigDto>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId() })
                .ToListAsync(cancellationToken);
            return Result<List<GigDto>>.Success(gigs);
        }
    }
}
