import axios from 'axios';
import { TicketStatus, Priority } from '../types';
import type { Ticket, CreateTicketData } from '../types';

const API_URL = `${import.meta.env.VITE_API_URL}/api/tickets`;
export const getTickets = async (status?: TicketStatus, priority?: Priority): Promise<Ticket[]> => {
  const res = await axios.get<Ticket[]>(API_URL, { params: { status, priority } });
  return res.data;
};
export const createTicket = async (data: CreateTicketData): Promise<Ticket> => {
  const res = await axios.post<Ticket>(API_URL, data);
  return res.data;
};
export const updateTicketStatus = async (id: number, status: TicketStatus): Promise<Ticket> => {
  const res = await axios.patch<Ticket>(`${API_URL}/${id}/status`, { status });
  return res.data;
};
export const deleteTicket = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};