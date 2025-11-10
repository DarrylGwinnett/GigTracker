using Application.Gigs.Commands;
using Application.Profiles.Commands;
using Application.Profiles.DTO;
using Application.Profiles.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpPost("images")]
        public async Task<ActionResult<Image>> CreateImageAsync([FromForm]IFormFile file)
        {
            return HandleResult(await Mediator.Send(new CreateProfileImage.Command { File = file }));
        }

        [HttpGet("{userId}/images")]
        public async Task<ActionResult<List<Image>>> GetUserImagesAsync(string userId)
        {
            return HandleResult(await Mediator.Send(new GetUserImages.Query { UserId = userId }));
        }

        [HttpDelete("images/{imageId}")]
        public async Task<ActionResult> DeleteImageAsync(string imageId)
        {
            return HandleResult(await Mediator.Send(new DeleteUserImage.Command { ImageId  = imageId }));
        }

        [HttpPut("images/{imageId}/setMain")]
        public async Task<ActionResult> SetMainImageAsync(string imageId)
        {
            return HandleResult(await Mediator.Send(new SetMainImage.Command { ImageId = imageId }));
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<UserProfile>> GetUserProfileAsync(string userId)
        {
            return HandleResult(await Mediator.Send(new GetProfile.Query { UserId = userId }));
        }
    }
}
