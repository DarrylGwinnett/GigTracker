using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Http;
using Persistence;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Security
{
    public class IsOrganiserRequirement : IAuthorizationRequirement
    {
    }

    public class IsOrganiserRequirementHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor) : AuthorizationHandler<IsOrganiserRequirement>
    {
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsOrganiserRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return;
            }
            var httpContext = httpContextAccessor.HttpContext;
            if (httpContext.GetRouteValue("id") is not string gigId) return;
            var gig = dbContext.Gigs.FindAsync(gigId);  
            var attendee = await dbContext.GigAttendees.AsNoTracking().SingleOrDefaultAsync(x => x.User.Id == userId && x.GigId == gigId);
            if (attendee == null) return;
            if (attendee.IsOrganizer) context.Succeed(requirement);

        }
    }
}
