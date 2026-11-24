

using server.Models;
using System;



namespace server.DTOs
{
    public record CreateTicketDto(string Title, Priority Priority, string Description)
   ;
}


