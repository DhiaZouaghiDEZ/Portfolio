using Microsoft.EntityFrameworkCore;
using PortfolioApp.Application.Interfaces;
using PortfolioApp.Application.Services;
using PortfolioApp.Infrastructure.Data;
using PortfolioApp.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Load local configuration (gitignored)
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddJsonFile("appsettings.Local.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

// Add services to the container.
builder.Services.AddControllers();

// Add OpenAPI
builder.Services.AddOpenApi();

// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Infrastructure Services
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

// Add Application Services
builder.Services.AddScoped<IWeatherForecastService, WeatherForecastService>();

// Add CORS if needed
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
