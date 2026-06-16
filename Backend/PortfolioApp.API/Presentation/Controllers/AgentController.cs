using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;

namespace PortfolioApp.API.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AgentController : ControllerBase
{
    private readonly IAgentService _agentService;
    private readonly ILogger<AgentController> _logger;

    public AgentController(IAgentService agentService, ILogger<AgentController> logger)
    {
        _agentService = agentService;
        _logger = logger;
    }

    [HttpPost("ask")]
    public async Task<IActionResult> Ask([FromBody] AgentQueryDTO query, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(query.Question))
            return BadRequest("Question cannot be empty.");

        var response = await _agentService.AskAsync(query.Question, cancellationToken);
        return Ok(response);
    }

    [HttpPost("seed")]
    [Authorize]
    public async Task<IActionResult> Seed(CancellationToken cancellationToken)
    {
        await _agentService.SeedKnowledgeBaseAsync(cancellationToken);
        return Ok(new { message = "Knowledge base seeded successfully." });
    }
}