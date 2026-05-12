using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;

namespace PortfolioApp.API.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperienceController : ControllerBase
    {
        private readonly ILogger<ExperienceController> _logger;
        private readonly IExperienceRepository _experienceRepository;
        public ExperienceController(IExperienceRepository experienceRepository, ILogger<ExperienceController> logger)
        {
            _logger = logger;
            _experienceRepository = experienceRepository;
        }
        [HttpPost, Route("addexperience")]
        public async Task<IActionResult> AddExperience([FromBody] ExperienceDTO experience, CancellationToken cancellationToken)
        {
            var result = await _experienceRepository.AddExperience(experience, cancellationToken);
            return Ok(result);
        }
        [HttpGet, Route("getallexperiences")]
        public async Task<IActionResult> GetAllExperiences(CancellationToken cancellationToken)
        {
            var result = await _experienceRepository.GetAllExperiences(cancellationToken);
            return Ok(result);
        }
        [HttpGet, Route("getexperience/{id}")]
        public async Task<IActionResult> GetExperienceById(Guid id, CancellationToken cancellationToken)
        {
            var result = await _experienceRepository.GetExperienceById(id, cancellationToken);
            return Ok(result);
        }
        [HttpDelete, Route("removeexperience/{id}")]
        public async Task<IActionResult> RemoveExperienceById(Guid id, CancellationToken cancellationToken)
        {
            await _experienceRepository.RemoveExperienceById(id, cancellationToken);
            return Ok();
        }
        [HttpPost, Route("updateexperience")]
        public async Task<IActionResult> UpdateExperience([FromBody] ExperienceDTO experience, CancellationToken cancellationToken)
        {
            var result = await _experienceRepository.UpdateExperience(experience, cancellationToken);
            return Ok(result);
        }
    }
}
