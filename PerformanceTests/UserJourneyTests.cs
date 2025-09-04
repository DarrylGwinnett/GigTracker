using API;
using Application.Gigs.DTO;
using Domain;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using NBomber.Contracts;
using NBomber.Contracts.Stats;
using NBomber.CSharp;
using NUnit.Framework;
using PerformanceTests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;

namespace GigApiLoadTests
{
    [TestFixture]
    public class GigLoadTests
    {
        private WebApplicationFactory<Program> _factory;
        private HttpClient _httpClient;
        private GigApiClient _gigApi;


        [SetUp]
        public void Setup()
        {
            // Start your API in-process
            _factory = new WebApplicationFactory<Program>()
                .WithWebHostBuilder(builder =>
                {
                    // You can configure test services here if needed
                });

            // Get HttpClient to talk to the in-process server
            _httpClient = _factory.CreateClient();
            _gigApi = new GigApiClient(_httpClient);
        }

        [TearDown]
        public void TearDown()
        {
            _httpClient.Dispose();
            _factory.Dispose();
        }

        [Test]
        public void Run_GigUserJourney()
        {
            var scenario = Scenario.Create("GigUserJourney", async context =>
            {
                // 1. Get list of gigs
                var gigs = await _gigApi.GetGigsAsync();
                if (gigs == null) return Response.Fail();

                // 2. Get a gig (if one exists)
                if (gigs.Count > 0)
                {
                    var ok = await _gigApi.GetGigAsync(gigs.First().Id);
                    if (!ok) return Response.Fail();
                }

                // 3. Create a new gig
                var newGig = await _gigApi.CreateGigAsync((int)context.InvocationNumber);
                if (newGig == null) return Response.Fail();

                // 4. Edit the gig
                var updated = await _gigApi.EditGigAsync(newGig);
                if (!updated) return Response.Fail();

                // 5. Delete the gig
                var deleted = await _gigApi.DeleteGigAsync(newGig.Id);
                if (!deleted) return Response.Fail();

                return Response.Ok();
            })
            .WithLoadSimulations(
                Simulation.KeepConstant(
                    copies: 100,                 
                    during: TimeSpan.FromMinutes(5)

                 )
            );

            NBomberRunner
                .RegisterScenarios(scenario)
                .WithReportFormats(ReportFormat.Html, ReportFormat.Csv)
                .WithReportFolder("nbomber-reports")
                .Run();
        }

    }
}
