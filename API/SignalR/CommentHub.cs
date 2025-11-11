using Application.Gigs.Commands;
using Application.Gigs.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class CommentHub(IMediator mediator) : Hub
    {
        public override async Task OnConnectedAsync()
        {
            var context = Context.GetHttpContext();
            var gigId = context?.Request.Query["gigId"];
            if (string.IsNullOrEmpty(gigId)) throw new HubException("No gig with this id");
            await Groups.AddToGroupAsync(Context.ConnectionId, gigId!);
            var result = await mediator.Send(new GetComments.Query { GigId= gigId! });
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }

        public async Task SendCommentAsync(CreateComment.Command command)
        {
            var comment = await mediator.Send(command);
            await Clients.Group(command.GigId).SendAsync("RecieveComment", comment.Value);

        }
    }
}
