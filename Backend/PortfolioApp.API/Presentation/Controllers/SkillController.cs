using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;

namespace PortfolioApp.API.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillController : ControllerBase
    {
        private readonly ILogger<SkillController> _logger;
        private readonly ISkillRepository _skillRepository;
        public SkillController(ISkillRepository skillRepository, ILogger<SkillController> logger)
        {
            _logger = logger;
            _skillRepository = skillRepository;
        }
        [HttpPost, Route("addskill")]
        [Authorize]
        public async Task<IActionResult> AddSkill([FromBody] SkillDTO skill, CancellationToken cancellationToken)
        {
            var result = await _skillRepository.AddSkill(skill, cancellationToken);
            return Ok(result);
        }
        [HttpGet, Route("getallskills")]
        public async Task<IActionResult> GetAllSkills(CancellationToken cancellationToken)
        {
            var result = await _skillRepository.GetAllSkills(cancellationToken);
            return Ok(result);
        }
        [HttpGet, Route("getskill/{id}")]
        public async Task<IActionResult> GetSkillById(Guid id, CancellationToken cancellationToken)
        {
            var result = await _skillRepository.GetSkillById(id, cancellationToken);
            return Ok(result);
        }
        [HttpDelete, Route("removeskill/{id}")]
        [Authorize]
        public async Task<IActionResult> RemoveSkillById(Guid id, CancellationToken cancellationToken)
        {
            await _skillRepository.RemoveSkillById(id, cancellationToken);
            return Ok();
        }
        [HttpPost, Route("updateskill")]
        [Authorize]
        public async Task<IActionResult> UpdateSkill([FromBody] SkillDTO skill, CancellationToken cancellationToken)
        {
            var result = await _skillRepository.UpdateSkill(skill, cancellationToken);
            return Ok(result);
        }
    }
}
