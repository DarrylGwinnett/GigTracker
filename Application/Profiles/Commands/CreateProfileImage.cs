using Application.Core;
using Application.Gigs.DTO;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;
using System.Reflection.Metadata.Ecma335;
namespace Application.Gigs.Commands
{
    public class CreateProfileImage
    {
        public class Command : IRequest<Result<Image>>
        {
            public required IFormFile File { get; set; }

        }

        public class Handler(AppDbContext context, IUserAccessor userAccessor, IImageService imageService) : IRequestHandler<Command, Result<Image>>
        {
            public async Task<Result<Image>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();
                var uploadResult = await imageService.UploadImageAsync(request.File);
                if (uploadResult is null) return Result<Image>.Failure("Failed to upload photo", 400);
                var image = new Image()
                {
                    Url = uploadResult.Url,
                    PublicId = uploadResult.PublicId,
                    UserId = user.Id,
                };
                context.UserImages.Add(image);
                user.ImageUrl ??= uploadResult.Url;
                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                return result
                    ? Result<Image>.Success(image)
                    : Result<Image>.Failure("Problem saving image", 400);
            }
        }
    }
}