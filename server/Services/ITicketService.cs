




using server.DTOs;
using server.Models;
namespace server.Services
{
    public interface ITicketService
    {
        Task<List<TicketDto>> GetAll(TicketStatus? status, Priority? priority);
        Task<TicketDto> Create(CreateTicketDto dto);
        Task<TicketDto?> UpdateStatus(int id, UpdateStatusDto dto);
        Task<bool> Delete(int id);

    }
}
