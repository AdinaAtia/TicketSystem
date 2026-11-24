
using server.Models;
using System;



namespace server.DTOs
{
    public record TicketDto(int Id,string Title, string Description, Priority Priority, TicketStatus Status, DateTime CreatedAt)
    {
    }
}

