
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Repositories
{
    public class TicketRepository : ITicketRepository
    {
        private readonly AppDbContext _context;
        public TicketRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task Add(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

        }

        public async Task Delete(Ticket ticket)
        {
            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Ticket>> GetAll(TicketStatus? status, Priority? priority)
        {
            var query = _context.Tickets.AsQueryable();
            if (status.HasValue)
            {
                query = query.Where(t => t.Status == status);
            }
            if (priority.HasValue)
            {
                query = query.Where(t => t.Priority == priority);
            }
            return await query.ToListAsync();
        }

        public async Task<Ticket?> GetById(int id)
        {
            return await _context.Tickets.FindAsync(id);
        }

        public async Task Update(Ticket ticket)
        {
            await _context.SaveChangesAsync();
        }
    }
}
