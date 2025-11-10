using Application.Core;
using Application.Gigs.DTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Gigs.Queries
{
    public class GetComments
    {
        public class Query : IRequest<Result<List<CommentDTO>>> {
            public required string GigId { get; set; } 
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<CommentDTO>>>
        {
            public async Task<Result<List<CommentDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {

                var gigComments = await context.Comments.Where(x=> x.GigId == request.GigId)
                    .OrderByDescending(x => x.CreatedAt)
                    .ProjectTo<CommentDTO>(mapper.ConfigurationProvider)
                    .ToListAsync();             
                return Result<List<CommentDTO>>.Success(gigComments);
            }
        }
    }
}
