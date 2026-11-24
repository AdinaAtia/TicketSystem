using server.Data;
using server.DTOs;
using server.Models;
using server.Repositories;

namespace server.Services
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _repository;
        public TicketService(ITicketRepository repository)
        {
            _repository = repository;
        }

        public async Task<TicketDto> Create(CreateTicketDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title) || string.IsNullOrWhiteSpace(dto.Description))
            {
                throw new ArgumentException("Title and description are required.");
            }
            var ticket = new Ticket
            {
                Title = dto.Title,
                Description = dto.Description,
                Priority = dto.Priority,
                Status = TicketStatus.Open,
                CreatedAt = DateTime.UtcNow
            }; await _repository.Add(ticket);
            return ToDto(ticket);
        }

        public async Task<bool> Delete(int id)
        {
            var ticket = await _repository.GetById(id);
            if (ticket == null)
            {
                return false;
            }
            await _repository.Delete(ticket);
            return true;
        }

        public async Task<List<TicketDto>> GetAll(TicketStatus? status, Priority? priority)
        {
            var tickets = await _repository.GetAll(status, priority);
            return tickets.Select(ToDto).ToList();
        }

        public async Task<TicketDto?> UpdateStatus(int id, UpdateStatusDto dto)
        {
            var ticket = await _repository.GetById(id);
            if (ticket == null)
            {
                return null;
            }
            ticket.Status = dto.Status;
            await _repository.Update(ticket);
            return ToDto(ticket);
        }
        private static TicketDto ToDto(Ticket ticket)
        {
            return new TicketDto(ticket.Id, ticket.Title, ticket.Description,  ticket.Priority, ticket.Status , ticket.CreatedAt);
        }
    }

}
