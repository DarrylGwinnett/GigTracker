using Application.Gigs.DTO;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
namespace Application.Commands
{
    public class CreateGig
    {
        public class Command : IRequest<string>
        {
            public required CreateGigDto gigDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, string>
        {
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                var gig = mapper.Map<Gig>(request.gigDto);
                context.Gigs.Add(gig);
                await context.SaveChangesAsync(cancellationToken);
                return gig.Id;
            }
        }
    }
}