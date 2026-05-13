using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private readonly IProfileRepository _profileRepository;
    private readonly ILogger<ProfileController> _logger;

    public ProfileController(IProfileRepository profileRepository, ILogger<ProfileController> logger)
    {
        _profileRepository = profileRepository;
        _logger = logger;
    }

    [HttpPost, Route("createprofile")]
    [Authorize]
    public async Task<IActionResult> CreateProfile([FromBody] ProfileDTO profile, CancellationToken cancellationToken)
    {
        var result = await _profileRepository.CreateProfile(profile, cancellationToken);
        return Ok(result);
    }
    [HttpGet, Route("getallprofiles")]
    public async Task<IActionResult> GetAllProfiles(CancellationToken cancellationToken)
    {
        var result = await _profileRepository.GetAllProfiles(cancellationToken);
        return Ok(result);
    }
    [HttpGet, Route("getprofile/{id}")]
    public async Task<IActionResult> GetProfileById(Guid id, CancellationToken cancellationToken)
    {
        var result = await _profileRepository.GetProfileById(id, cancellationToken);
        return Ok(result);
    }
    [HttpDelete, Route("removeprofile/{id}")]
    [Authorize]
    public async Task<IActionResult> RemoveProfileById(Guid id, CancellationToken cancellationToken)
    {
        await _profileRepository.RemoveProfileById(id, cancellationToken);
        return Ok();
    }
    [HttpPost, Route("updateprofile")]
    [Authorize]
    public async Task<IActionResult> UpdateProfile([FromBody] ProfileDTO profile, CancellationToken cancellationToken)
    {
        var result = await _profileRepository.UpdateProfile(profile, cancellationToken);
        return Ok(result);
    }

}