export enum TicketStatus {

  Open = 0, InProgress = 1, Closed = 2
}
export enum Priority {
  Low = 0, Medium = 1, High = 2
}
export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: TicketStatus;
  createdAt: string;
}
export interface CreateTicketData {
  title: string;
  description: string;
  priority: Priority;


}