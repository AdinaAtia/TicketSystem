import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { getTickets } from './api/ticketsApi';
import type { Ticket } from './types';

const App = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTickets();
      setTickets(data);
    } catch {
      setError('לא ניתן לטעון את הקריאות. בדקו שהשרת פועל ונסו שוב.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
fetchTickets();  }, []);

  return (
    <Box sx={{ p: 4, direction: 'rtl' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>ניהול קריאות שירות</Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <Typography>נמצאו {tickets.length} קריאות</Typography>
    </Box>
  );
};

export default App;