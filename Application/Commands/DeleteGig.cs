using AutoMapper;
using Domain;
using MediatR;
using Persistence;
namespace Application.Commands
{
    public class DeleteGig
    {
        public class Command : IRequest
        {
          public required string Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var gigToUpdate = await context.Gigs.FindAsync([request.Id, cancellationToken]) ?? throw new KeyNotFoundException();
                context.Remove(gigToUpdate);
                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}