using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
namespace Application.Commands
{
    public class EditGig
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required Gig Gig { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var gigToUpdate = await context.Gigs.FindAsync([request.Gig.Id, cancellationToken]) ?? throw new KeyNotFoundException();
                if (gigToUpdate == null) return Result<Unit>.Failure("Gig not found", 404);
                mapper.Map(request.Gig, gigToUpdate);
                var result = await context.SaveChangesAsync(cancellationToken);
                if (result <= 0) return Result<Unit>.Failure("Failed to update gig", 400);
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}