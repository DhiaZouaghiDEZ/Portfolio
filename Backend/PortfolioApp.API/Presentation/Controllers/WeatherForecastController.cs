using Microsoft.AspNetCore.Mvc;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;

namespace PortfolioApp.API.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherForecastController : ControllerBase
{
    private readonly IWeatherForecastService _weatherForecastService;

    public WeatherForecastController(IWeatherForecastService weatherForecastService)
    {
        _weatherForecastService = weatherForecastService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WeatherForecastDto>>> Get()
    {
        var forecasts = await _weatherForecastService.GetWeatherForecastsAsync();
        return Ok(forecasts);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<WeatherForecastDto>> GetById(int id)
    {
        var forecast = await _weatherForecastService.GetWeatherForecastByIdAsync(id);
        if (forecast == null)
            return NotFound();

        return Ok(forecast);
    }

    [HttpPost]
    public async Task<ActionResult<WeatherForecastDto>> Create(WeatherForecastDto dto)
    {
        var result = await _weatherForecastService.CreateWeatherForecastAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _weatherForecastService.DeleteWeatherForecastAsync(id);
        if (!result)
            return NotFound();

        return NoContent();
    }
}
