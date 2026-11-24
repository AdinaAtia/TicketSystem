namespace server.Models
{
    public class Ticket
    {

        public int Id { get; set; }


        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public Priority Priority { get; set; }

        public TicketStatus Status { get; set; }

        public DateTime CreatedAt { get; set; }
       
 
}
}
