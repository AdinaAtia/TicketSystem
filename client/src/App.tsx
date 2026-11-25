import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import type { Ticket,CreateTicketData } from './types';
import { getTickets, createTicket, updateTicketStatus, deleteTicket } from './api/ticketsApi';
import TicketForm from './components/TicketForm';
import TicketTable from './components/TicketTable';
import { TicketStatus } from './types';
import TicketFilters from './components/TicketFilters';
const App = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | ''>('');
  const [search, setSearch] = useState('');
  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
const data = await getTickets(statusFilter === '' ? undefined : statusFilter);
      setTickets(data);
    } catch {
      setError('לא ניתן לטעון את הקריאות. בדקו שהשרת פועל ונסו שוב.');
    } finally {
      setLoading(false);
    }
  };
const handleCreate = async (data: CreateTicketData) => {
    try {
      const newTicket = await createTicket(data);
      setTickets((prev) => [...prev, newTicket]);
    } catch {
      setError('לא ניתן לפתוח את הקריאה. נסו שוב.');
    }
  };
    const handleDelete = async (id: number) => {
    try {
      await deleteTicket(id);
      setTickets((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError('לא ניתן למחוק את הקריאה.');
    }
  };

  const handleStatusChange = async (id: number, status: TicketStatus) => {
    try {
      const updated = await updateTicketStatus(id, status);
      setTickets((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setError('לא ניתן לעדכן את הסטטוס');
    }
  };
  useEffect(() => {
fetchTickets();  }, [statusFilter]);
const filteredTickets = tickets.filter((t) =>
  t.title.toLowerCase().includes(search.toLowerCase())
);
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>ניהול קריאות שירות</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <TicketForm onCreate={handleCreate} />
      <TicketFilters status={statusFilter} onStatusChange={setStatusFilter} search={search} onSearchChange={setSearch} />

<TicketTable tickets={filteredTickets} onStatusChange={handleStatusChange} onDelete={handleDelete} />    </Box>
    
  );
};

export default App;