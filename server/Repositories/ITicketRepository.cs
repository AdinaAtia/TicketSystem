using server.Models;

namespace server.Repositories
{
    public interface ITicketRepository
    {
        Task<List<Ticket>> GetAll(TicketStatus? status, Priority? priority);
        Task<Ticket?> GetById(int id);
        Task Delete(Ticket ticket);

        Task Update(Ticket ticket);
        Task Add(Ticket ticket);



    }
}
