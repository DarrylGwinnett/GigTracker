using Application.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class GigsController(AppDbContext context, IMediator mediator) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Gig>>> GetGigs() {
            return await mediator.Send(new GetGigList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Gig>> GetGigDetail(string id)
        {
            return await mediator.Send(new GetGigDetail.Query { Id = id });
        }
    }
}
