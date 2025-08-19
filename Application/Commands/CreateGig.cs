using Domain;
using MediatR;
using Persistence;
namespace Application.Commands
{
    public class CreateGig
    {
        public class Command : IRequest<string>
        {
            public required Gig Gig { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command, string>
        {
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                context.Gigs.Add(request.Gig);
                await context.SaveChangesAsync(cancellationToken);
                return request.Gig.Id;
            }
        }
    }
}