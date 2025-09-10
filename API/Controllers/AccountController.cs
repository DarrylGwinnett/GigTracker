using Application.Gigs.Queries;
using Application.Users.Commands;
using Application.Users.DTO;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController(SignInManager<User> signInManager) : BaseApiController
    {
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> RegisterUser(RegisterDTO registerDTO)
        {
            return HandleResult(await Mediator.Send(new CreateUser.Command { registerDTO = registerDTO }));
        }

        [HttpGet("user-info")]
        public async Task<ActionResult> GetUserInfo()
        {
            if (!User.Identity!.IsAuthenticated) return NoContent();
            return HandleResult(await Mediator.Send(new GetUserInfo.Query { Username = User.Identity.Name! }));
        }

        [HttpGet("logout")]
        public async Task<ActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return NoContent();

        }
    }
}
