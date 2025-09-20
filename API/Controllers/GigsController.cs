using Application.Core;
using Application.Gigs.Commands;
using Application.Gigs.DTO;
using Application.Gigs.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GigsController() : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<GigDto>>> GetGigs() {
            return HandleResult(await Mediator.Send(new GetGigList.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Result<GigDto>>> GetGigDetail(string id)
        {
            return HandleResult(await Mediator.Send(new GetGigDetail.Query { Id = id }));
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateGigAsync(CreateGigDto gig)
        {
            return HandleResult(await Mediator.Send(new CreateGig.Command { GigDto = gig }));
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsGigOrganiser")]
        public async Task<ActionResult> EditGigAsync(string id, EditGigDto gig)
        {
            gig.Id = id;
            return HandleResult(await Mediator.Send(new EditGig.Command { GigDto = gig }));
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsGigOrganiser")]
        public async Task<ActionResult<Result<Unit>>> DeleteGigAsync(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteGig.Command { Id = id }));
            
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult<string>> AttendAsync(string id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }
    }
}
