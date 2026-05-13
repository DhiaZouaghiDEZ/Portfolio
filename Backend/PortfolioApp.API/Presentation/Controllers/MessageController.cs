using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using PortfolioApp.Application.DTOs;
using PortfolioApp.Application.Interfaces;

namespace PortfolioApp.API.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly ILogger<MessageController> _logger;
        private readonly IMessageRepository _messageRepository;
        public MessageController(IMessageRepository messageRepository, ILogger<MessageController> logger)
        {
            _logger = logger;
            _messageRepository = messageRepository;
        }
        [HttpPost, Route("addmessage")]
        [EnableRateLimiting("ContactForm")]
        public async Task<IActionResult> AddMessage([FromBody] MessageDTO message, CancellationToken cancellationToken)
        {
            var result = await _messageRepository.AddMessage(message, cancellationToken);
            return Ok(result);
        }
        [HttpGet, Route("getallmessages")]
        public async Task<IActionResult> GetAllMessages(CancellationToken cancellationToken)
        {
            var result = await _messageRepository.GetAllMessages(cancellationToken);
            return Ok(result);
        }
        [HttpGet, Route("getmessage/{id}")]
        public async Task<IActionResult> GetMessageById(Guid id, CancellationToken cancellationToken)
        {
            var result = await _messageRepository.GetMessageById(id, cancellationToken);
            return Ok(result);
        }
        [HttpDelete, Route("removemessage/{id}")]
        [Authorize]
        public async Task<IActionResult> RemoveMessageById(Guid id, CancellationToken cancellationToken)
        {
            await _messageRepository.RemoveMessageById(id, cancellationToken);
            return Ok();
        }
        [HttpPost, Route("updatemessage")]
        [Authorize]
        public async Task<IActionResult> UpdateMessage([FromBody] MessageDTO message, CancellationToken cancellationToken)
        {
            var result = await _messageRepository.UpdateMessage(message, cancellationToken);
            return Ok(result);
        }
    }
}
