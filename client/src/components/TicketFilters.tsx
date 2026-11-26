import { TicketStatus } from '../types';
import { statusLabels, statusOptions } from '../constants';
import { Stack, Paper, Button, TextField, MenuItem } from '@mui/material';
interface TicketFiltersProps {
  status: TicketStatus | '';
  onSearchChange: (search: string) => void
  search: string;
  onStatusChange: (status: TicketStatus | '') => void;
}
const TicketFilters = ({ status, onStatusChange, search, onSearchChange }: TicketFiltersProps) => {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Stack direction="row" spacing={2}>
        <TextField
          label="חיפוש לפי כותרת"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ flex: 1 }}
        />
        <TextField
          select
          value={status}
          onChange={(e) => onStatusChange(e.target.value === '' ? '' : Number(e.target.value) as TicketStatus)}
          label="סטטוס"
          sx={{ width: 200 }}
        >
          <MenuItem value="">הכול</MenuItem>
          {statusOptions.map((s) => (
            <MenuItem key={s} value={s}>{statusLabels[s]}</MenuItem>
          ))}
        </TextField>
        <Button
          onClick={() => { onSearchChange(''); onStatusChange(''); }}
          variant="outlined"
        >
          נקה סינון
        </Button>
      </Stack>
    </Paper>

  );
};
export default TicketFilters;