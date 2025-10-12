using API.Middleware;
using Application.Core;
using Application.Gigs.Queries;
using Application.Interfaces;
using Application.Users.Commands;
using FluentValidation;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Persistence;
using Scalar.AspNetCore;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});
builder.Services.AddOpenApi();
builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetGigList.Handler>();
    x.RegisterServicesFromAssemblyContaining<CreateUser.Handler>();
    x.AddOpenBehavior(typeof(ValidationBehaviour<,>));
});
builder.Services.AddAutoMapper(config =>
{
    config.AddProfile<MappingProfiles>();
}, typeof(MappingProfiles).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<GetGigList.Handler>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateUser.Command>();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddTransient<ExceptionMiddleware>();
builder.Services.AddScoped<IUserAccessor, UserAccessor>();
builder.Services.AddScoped<IPhotoService, PhotoService>();
builder.Services.AddIdentityApiEndpoints<Domain.User>(opt =>
{
    opt.User.RequireUniqueEmail = true;
})
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddCors();
builder.Services.Configure<Infrastructure.Photos.CloudinarySettings>(builder.Configuration.GetSection("Cloudinary"));

builder.Services.AddAuthorizationBuilder()
    .AddPolicy("IsGigOrganiser", policy =>
    {
        policy.Requirements.Add(new IsOrganiserRequirement());
    });
builder.Services.AddTransient<IAuthorizationHandler, IsOrganiserRequirementHandler>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000", "https://localhost:3000"));
app.MapControllers();
app.MapGroup("api").MapIdentityApi<Domain.User>();
app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToController("Index", "Fallback");

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    var um = services.GetRequiredService<UserManager<Domain.User>>();
    await Dbinitializer.SeedData(context, um);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "Error occured during migration");
}

app.Run();

public partial class Program { }