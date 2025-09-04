using Application.Gigs.DTO;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace PerformanceTests
{
    internal class GigApiClient
    {
        private readonly HttpClient _httpClient;

        public GigApiClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<Gig>?> GetGigsAsync()
        {
            var resp = await _httpClient.GetAsync("api/gigs");
            if (!resp.IsSuccessStatusCode) return null;

            var json = await resp.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<Gig>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        public async Task<bool> GetGigAsync(string id)
        {
            var resp = await _httpClient.GetAsync($"api/gigs/{id}");
            return resp.IsSuccessStatusCode;
        }

        public async Task<EditGigDto?> CreateGigAsync(int invocationNumber)
        {
            var gig = new CreateGigDto
            {
                Title = $"LoadTestGig-{invocationNumber}",
                Venue = "Test Venue",
                City = "Test City",
                Category = "Test Category",
                Description = "This is a test gig created during load testing.",
                Artist = "Test Artist",
                Latitude = 40.7128,
                Longitude = -74.0060,
                Date = DateTime.UtcNow.AddDays(30)
            };

            var resp = await _httpClient.PostAsJsonAsync("api/gigs", gig);
            if (!resp.IsSuccessStatusCode) return null;

            var id = await resp.Content.ReadAsStringAsync();
            return CreateGigToEditGigDto(gig, id);
        }

        public async Task<bool> EditGigAsync(EditGigDto gig)
        {
            gig.Title += "-Edited";
            var resp = await _httpClient.PutAsJsonAsync($"api/gigs/", gig);
            return resp.IsSuccessStatusCode;
        }

        public async Task<bool> DeleteGigAsync(string id)
        {
            var resp = await _httpClient.DeleteAsync($"api/gigs/{id}");
            return resp.IsSuccessStatusCode;
        }

        private static EditGigDto CreateGigToEditGigDto(CreateGigDto gig, string gigId)
        {
            return new EditGigDto
            {
                Id = gigId,
                Title = gig.Title,
                Venue = gig.Venue,
                City = gig.City,
                Category = gig.Category,
                Description = gig.Description,
                Artist = gig.Artist,
                Latitude = gig.Latitude,
                Longitude = gig.Longitude,
                Date = gig.Date
            };
        }
    }
}
