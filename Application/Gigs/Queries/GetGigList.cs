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

    private const int MaxPageSize = 50;
    public class Query : IRequest<Result<PagedList<GigDto, DateTime?>>>
    {

        public DateTime? Cursor;
        private int _pageSize = 5;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<PagedList<GigDto, DateTime?>>>
    {
        public async Task<Result<PagedList<GigDto, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Gigs
                .OrderBy(x => x.Date)
                .AsQueryable();
            if (request.Cursor.HasValue)
            {
                query = query.Where(x => x.Date >= request.Cursor.Value);
            }
            var gigs = await query
                .Take(request.PageSize + 1)
                .ProjectTo<GigDto>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId() })
                .ToListAsync(cancellationToken);
            DateTime? nextCursor = null;
            if (gigs.Count > request.PageSize)
            {
                nextCursor = gigs.Last().Date;
                gigs.RemoveAt(gigs.Count - 1);
            }
            return Result<PagedList<GigDto, DateTime?>>.Success(new PagedList<GigDto, DateTime?> { Items = gigs, NextCursor = nextCursor });
        }
    }
}
