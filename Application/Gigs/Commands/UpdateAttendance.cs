using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Gigs.Commands
{
    public class UpdateAttendance
    {
        public class Command: IRequest<Result<Unit>>
        {
            public required string Id {  get; set; }

        }

        public class Handler(IUserAccessor userAccessor, AppDbContext dbContext) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                
                var gig = await dbContext.Gigs.Include(x => x.Attendees).ThenInclude(x => x.User).FirstOrDefaultAsync(x=>x.Id == request.Id);

                if (gig == null) return Result<Unit>.Failure("Could not find gig.", 404);
                var user =await userAccessor.GetUserAsync();
                var attendance = gig.Attendees.FirstOrDefault(x => x.UserId == user.Id);
                var isOrganiser = gig.Attendees.Any(x => x.IsOrganizer && x.UserId == user.Id);

                if(attendance != null)
                {
                    if (isOrganiser) gig.IsCancelled = !gig.IsCancelled;
                    else gig.Attendees.Remove(attendance);
                }
                else
                {
                    gig.Attendees.Add(new()
                    {
                        UserId = user.Id,
                        IsOrganizer = false,
                        GigId = gig.Id,
                    });
                }
                var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Problem updating attendances", 400);

            }
        }
    }
}
