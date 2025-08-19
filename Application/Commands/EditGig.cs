using Domain;
using MediatR;
using Persistence;
namespace Application.Commands
{
    public class EditGig
    {
        public class Command : IRequest
        {
            public required Gig Gig { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var gigToUpdate = await context.Gigs.FindAsync([request.Gig.Id, cancellationToken]) ?? throw new KeyNotFoundException();
                gigToUpdate = request.Gig;
                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}