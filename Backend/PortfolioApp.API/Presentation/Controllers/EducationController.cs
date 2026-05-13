using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;

namespace PortfolioApp.API.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationController : ControllerBase
    {
        private readonly ILogger<EducationController> _logger;
        private readonly IEducationRepository _educationRepository;
        public EducationController(IEducationRepository educationRepository, ILogger<EducationController> logger)
        {
            _logger = logger;
            _educationRepository = educationRepository;
        }
        [HttpPost, Route("addeducation")]
        [Authorize]
        public async Task<IActionResult> AddEducation([FromBody] EducationDTO education, CancellationToken cancellationToken)
        {
            var result = await _educationRepository.AddEducation(education, cancellationToken);
            return Ok(result);
        }
        [HttpGet, Route("getalleducations")]
        public async Task<IActionResult> GetAllEducations(CancellationToken cancellationToken)
        {
            var result = await _educationRepository.GetAllEducations(cancellationToken);
            return Ok(result);
        }
        [HttpGet, Route("geteducation/{id}")]
        public async Task<IActionResult> GetEducationById(Guid id, CancellationToken cancellationToken)
        {
            var result = await _educationRepository.GetEducationById(id, cancellationToken);
            return Ok(result);
        }
        [HttpDelete, Route("removeeducation/{id}")]
        [Authorize]
        public async Task<IActionResult> RemoveEducationById(Guid id, CancellationToken cancellationToken)
        {
            await _educationRepository.RemoveEducationById(id, cancellationToken);
            return Ok();
        }
        [HttpPost, Route("updateeducation")]
        [Authorize]
        public async Task<IActionResult> UpdateEducation([FromBody] EducationDTO education, CancellationToken cancellationToken)
        {
            var result = await _educationRepository.UpdateEducation(education, cancellationToken);
            return Ok(result);
        }
    }
}
