import { useState } from 'react';
import { Paper, Stack, TextField, MenuItem, Button, Typography } from '@mui/material';
import { Priority } from '../types';
import type { CreateTicketData } from '../types';

interface TicketFormProps {
  onCreate: (data: CreateTicketData) => Promise<void>;
}

const TicketForm = ({ onCreate }: TicketFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.Low);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setFormError('יש למלא כותרת ותיאור');
      return;
    }
    setFormError(null);
    setSubmitting(true);
    try {
      await onCreate({ title, description, priority });
      setTitle('');
      setDescription('');
      setPriority(Priority.Low);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>פתיחת קריאה חדשה</Typography>
      <Stack spacing={2}>
        <TextField label="כותרת" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField label="תיאור הבעיה" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} />
        <TextField select label="דחיפות" value={priority} onChange={(e) => setPriority(Number(e.target.value) as Priority)}>
          <MenuItem value={Priority.Low}>נמוכה</MenuItem>
          <MenuItem value={Priority.Medium}>בינונית</MenuItem>
          <MenuItem value={Priority.High}>גבוה</MenuItem>
        </TextField>
        {formError && <Typography color="error">{formError}</Typography>}
        <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'שולח...' : 'פתח קריאה'}
        </Button>
      </Stack>
    </Paper>
  );
};

export default TicketForm;