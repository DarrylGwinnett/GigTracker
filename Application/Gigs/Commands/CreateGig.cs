using Application.Core;
using Application.Gigs.DTO;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
namespace Application.Gigs.Commands
{
    public class CreateGig
    {
        public class Command : IRequest<Result<string>>
        {
            public required CreateGigDto GigDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
        {
            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                var gig = mapper.Map<Gig>(request.GigDto);
                context.Gigs.Add(gig);
                var result = await context.SaveChangesAsync(cancellationToken);
                if (result <= 0) return Result<string>.Failure("Failed to create gig", 400);
                return Result<string>.Success(gig.Id);
            }
        }
    }
}