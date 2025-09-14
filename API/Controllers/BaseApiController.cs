using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
        ?? throw new InvalidOperationException("IMediatr service is unavailable");

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (!result.IsSuccess && result.StatusCode == 404)
            {
                return NotFound(result.Error);
            }
            if (result.IsSuccess && result.Value != null)
            {
                return Ok(result.Value);
            }
            if(result.Error is not null) return BadRequest(result.Error);
            return BadRequest(result);
        }
    }
}


