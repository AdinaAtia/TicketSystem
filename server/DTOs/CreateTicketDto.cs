
using server.Models;
namespace server.DTOs
{
    public record CreateTicketDto(string Title, string Description, Priority Priority);
}