import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert, Container } from '@mui/material';
import type { Ticket, CreateTicketData } from './types';
import { getTickets, createTicket, updateTicketStatus, deleteTicket } from './api/ticketsApi';
import TicketForm from './components/TicketForm';
import TicketTable from './components/TicketTable';
import { TicketStatus } from './types';
import TicketFilters from './components/TicketFilters';
const App = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | ''>('');
  const [search, setSearch] = useState('');
  const handleFilterChange = (value: TicketStatus | '') => {
    setLoading(true);
    setStatusFilter(value);
  };
  const handleCreate = async (data: CreateTicketData) => {
    try {
      const newTicket = await createTicket(data);
      if (statusFilter === '' || newTicket.status === statusFilter) {
        setTickets((prev) => [...prev, newTicket]);
      }
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
      if (statusFilter !== '' && updated.status !== statusFilter) {
        setTickets((prev) => prev.filter((t) => t.id !== id));
      } else {
        setTickets((prev) => prev.map((t) => (t.id === id ? updated : t)));
      }
    } catch {
      setError('לא ניתן לעדכן את הסטטוס');
    }
  };
  useEffect(() => {
    let ignore = false;
    getTickets(statusFilter === '' ? undefined : statusFilter)
      .then((data) => {
        if (!ignore) {
          setTickets(data);
          setError(null);
        }
      })
      .catch(() => {
        if (!ignore) setError('לא ניתן לטעון את הקריאות. בדקו שהשרת פועל ונסו שוב.');
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [statusFilter]);
  const filteredTickets = tickets.filter((t) =>
    t.title.toLowerCase().includes(search.trim().toLowerCase())
  );
  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 3 }}>ניהול קריאות שירות</Typography>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        <TicketForm onCreate={handleCreate} />
        <TicketFilters status={statusFilter} onStatusChange={handleFilterChange} search={search} onSearchChange={setSearch} />        <TicketTable tickets={filteredTickets} onStatusChange={handleStatusChange} onDelete={handleDelete} />     </Container>
    </Box>
  );
};

export default App;