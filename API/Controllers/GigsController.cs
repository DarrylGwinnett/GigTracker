using Application.Commands;
using Application.Core;
using Application.Gigs.DTO;
using Application.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GigsController() : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Gig>>> GetGigs() {
            return HandleResult(await Mediator.Send(new GetGigList.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Result<Gig>>> GetGigDetail(string id)
        {
            return HandleResult(await Mediator.Send(new GetGigDetail.Query { Id = id }));
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateGigAsync(CreateGigDto gig)
        {
            return HandleResult(await Mediator.Send(new CreateGig.Command { GigDto = gig }));
        }

        [HttpPut]
        public async Task<ActionResult> EditGigAsync(EditGigDto gig)
        {
            return HandleResult(await Mediator.Send(new EditGig.Command { GigDto = gig }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Result<Unit>>> DeleteGigAsync(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteGig.Command { Id = id }));
            
        }
    }
}
