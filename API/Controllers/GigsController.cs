using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class GigsController(AppDbContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Gig>>> GetGigs() {
            return await context.Gigs.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Gig>>> GetGigDetail(string id)
        {
            var gig = await context.Gigs.FindAsync(id);
            if(gig == null)
            {
                return NotFound();
            }
            return Ok(gig);
        }
    }
}
