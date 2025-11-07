using Application.Profiles.DTO;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IImageService
    {
        Task<ImageUploadResult?> UploadImageAsync(IFormFile file);
        Task<string> DeleteImageAsync(string publicId);
    }
}
