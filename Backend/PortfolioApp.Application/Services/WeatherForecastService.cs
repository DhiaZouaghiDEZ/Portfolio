using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;
using PortfolioApp.Domain.Entities;

namespace PortfolioApp.Application.Services;

public class WeatherForecastService : IWeatherForecastService
{
    private static readonly string[] Summaries =
    [
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    ];

    public async Task<IEnumerable<WeatherForecastDto>> GetWeatherForecastsAsync()
    {
        return await Task.FromResult(
            Enumerable.Range(1, 5).Select(index => new WeatherForecastDto
            {
                Id = index,
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                TemperatureF = 32 + (int)(Random.Shared.Next(-20, 55) / 0.5556),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToList()
        );
    }

    public async Task<WeatherForecastDto?> GetWeatherForecastByIdAsync(int id)
    {
        var forecasts = await GetWeatherForecastsAsync();
        return forecasts.FirstOrDefault(f => f.Id == id);
    }

    public async Task<WeatherForecastDto> CreateWeatherForecastAsync(WeatherForecastDto dto)
    {
        // In a real application, this would save to database
        await Task.Delay(10);
        return dto;
    }

    public async Task<bool> DeleteWeatherForecastAsync(int id)
    {
        // In a real application, this would delete from database
        await Task.Delay(10);
        return true;
    }
}
