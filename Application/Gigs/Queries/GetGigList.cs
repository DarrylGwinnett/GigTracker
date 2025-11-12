using Application.Core;
using Application.Gigs.DTO;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Gigs.Queries;

public class GetGigList
{

    public class Query : IRequest<Result<PagedList<GigDto, DateTime?>>>
    {
        public required GigParams GigParams { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<PagedList<GigDto, DateTime?>>>
    {
        public async Task<Result<PagedList<GigDto, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Gigs
                .OrderBy(x => x.Date)
                .Where(x => x.Date >= (request.GigParams.Cursor ?? request.GigParams.StartDate))
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.GigParams.Filter))
            {
                query = request.GigParams.Filter switch
                {
                    "isGoing" => query.Where(x => x.Attendees.Any(a => a.UserId == userAccessor.GetUserId())),
                    "isHost" => query.Where(x => x.Attendees.Any(a => a.IsOrganiser && a.UserId == userAccessor.GetUserId())),
                    _ => query
                };
            }

            var projectedGigs = query.ProjectTo<GigDto>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId() });

            var gigs = await projectedGigs
                .Take(request.GigParams.PageSize + 1)
                .ToListAsync(cancellationToken);

            DateTime? nextCursor = null;
            if (gigs.Count > request.GigParams.PageSize)
            {
                nextCursor = gigs.Last().Date;
                gigs.RemoveAt(gigs.Count - 1);
            }
            return Result<PagedList<GigDto, DateTime?>>.Success(new PagedList<GigDto, DateTime?> { Items = gigs, NextCursor = nextCursor });
        }
    }
}
