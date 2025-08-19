using AutoMapper;
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

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var gigToUpdate = await context.Gigs.FindAsync([request.Gig.Id, cancellationToken]) ?? throw new KeyNotFoundException();
                mapper.Map(request.Gig, gigToUpdate);
                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}