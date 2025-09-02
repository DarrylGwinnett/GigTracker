using Application.Commands;
using Application.Gigs.DTO;
using Application.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GigsController() : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Gig>>> GetGigs() {
            return await Mediator.Send(new GetGigList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Gig>> GetGigDetail(string id)
        {
            return await Mediator.Send(new GetGigDetail.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateGigAsync(CreateGigDto gig)
        {
            return await Mediator.Send(new CreateGig.Command { gigDto = gig });
        }

        [HttpPut]
        public async Task<ActionResult> EditGigAsync(Gig gig)
        {
            await Mediator.Send(new EditGig.Command { Gig = gig });
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGigAsync(string id)
        {
            await Mediator.Send(new DeleteGig.Command { Id = id });
            return NoContent();
        }
    }
}
