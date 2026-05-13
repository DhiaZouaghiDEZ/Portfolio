using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;
using PortfolioApp.Infrastructure.Repositories;

namespace PortfolioApp.API.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ILogger<ProjectController> _logger;
        private readonly IProjectRepository _projectRepository;
        public ProjectController(IProjectRepository projectRepository, ILogger<ProjectController> logger)
        {
            _logger = logger;
            _projectRepository = projectRepository;
        }
        [HttpPost, Route("addproject")]
        [Authorize]
        public async Task<IActionResult> AddProject([FromBody] ProjectDTO project, CancellationToken cancellationToken)
        {
            var result = await _projectRepository.AddProject(project, cancellationToken);
            return Ok(result);
        }
        [HttpGet, Route("getallprojects")]
        public async Task<IActionResult> GetAllProjects(CancellationToken cancellationToken)
        {
            var result = await _projectRepository.GetAllProjects(cancellationToken);
            return Ok(result);
        }
        [HttpGet, Route("getproject/{id}")]
        public async Task<IActionResult> GetProjectById(Guid id, CancellationToken cancellationToken)
        {
            var result = await _projectRepository.GetProjectById(id, cancellationToken);
            return Ok(result);
        }
        [HttpDelete, Route("removeproject/{id}")]
        [Authorize]
        public async Task<IActionResult> RemoveProjectById(Guid id, CancellationToken cancellationToken)
        {
            await _projectRepository.RemoveProjectById(id, cancellationToken);
            return Ok();
        }
        [HttpPost, Route("updateproject")]
        [Authorize]
        public async Task<IActionResult> UpdateProject([FromBody] ProjectDTO project, CancellationToken cancellationToken)
        {
            var result = await _projectRepository.UpdateProject(project, cancellationToken);
            return Ok(result);
        }
    }
}
