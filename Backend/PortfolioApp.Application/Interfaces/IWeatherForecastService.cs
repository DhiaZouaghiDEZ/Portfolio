using PortfolioApp.Application.DTOs;

namespace PortfolioApp.Application.Interfaces;

public interface IWeatherForecastService
{
    Task<IEnumerable<WeatherForecastDto>> GetWeatherForecastsAsync();
    Task<WeatherForecastDto?> GetWeatherForecastByIdAsync(int id);
    Task<WeatherForecastDto> CreateWeatherForecastAsync(WeatherForecastDto dto);
    Task<bool> DeleteWeatherForecastAsync(int id);
}
