using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
namespace Application.Commands
{
    public class DeleteGig
    {
        public class Command : IRequest<Result<Unit>>
        {
          public required string Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var gigToUpdate = await context.Gigs.FindAsync(request.Id, cancellationToken);
                if(gigToUpdate == null) return Result<Unit>.Failure("Gig not found", 404);
                context.Remove(gigToUpdate);
                var result = await context.SaveChangesAsync(cancellationToken);
                if(result <= 0) return Result<Unit>.Failure("Failed to delete gig", 400);
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}