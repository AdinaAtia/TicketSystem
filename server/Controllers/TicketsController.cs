using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using server.DTOs;
using server.Models;
using server.Services;
namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {

        private readonly ITicketService _service;

        public TicketsController(ITicketService service)
        {
            _service = service;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll(TicketStatus? status, Priority? priority)
        {
            var tickets = await _service.GetAll(status, priority);
            return Ok(tickets);
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateTicketDto dto)
        {
            try
            {
                var ticket = await _service.Create(dto);
                return StatusCode(201, ticket);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, UpdateStatusDto dto)
        {
            var ticket = await _service.UpdateStatus(id, dto);
            if (ticket == null)
            {
                return NotFound();
            }
            return Ok(ticket);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.Delete(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
