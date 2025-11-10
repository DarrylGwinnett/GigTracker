using Application.Core;
using Application.Gigs.DTO;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Gigs.Commands
{
    public class CreateComment
    {
        public class Command : IRequest<Result<CommentDTO>>
        {
            public required string Body { get; set; }
            public required string GigId { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<CommentDTO>>
        {
            public async Task<Result<CommentDTO>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();
                var gig = await context.Gigs.Include(x => x.Comments).ThenInclude(x => x.User).FirstOrDefaultAsync(x => x.Id == request.GigId, cancellationToken);
                if (gig is null)
                {
                    return Result<CommentDTO>.Failure("No gig found", 404);
                }
                var comment = new Comment() { 
                    Body = request.Body, 
                    GigId = request.GigId,
                    UserId = user.Id
                };
                gig.Comments.Add(comment);
                var result = await context.SaveChangesAsync(cancellationToken);
                if (result <= 0) return Result<CommentDTO>.Failure("Failed to create comment", 400);
                return Result<CommentDTO>.Success(mapper.Map<CommentDTO>(comment));
            }
        }
    }
}