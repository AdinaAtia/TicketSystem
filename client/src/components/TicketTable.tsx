import {
  Typography, Table, TableBody, TableCell, TableContainer, IconButton, Paper, Chip
  , TableHead, TableRow, Tooltip, TextField, MenuItem
} from '@mui/material';
import { DeleteOutlined as DeleteOutlineIcon } from '@mui/icons-material';
import { TicketStatus } from '../types';
import type { Ticket } from '../types';
import { priorityLabels, priorityColors, statusLabels, statusOptions } from '../constants';
interface TicketTableProps {
  tickets: Ticket[];
  onStatusChange: (id: number, status: TicketStatus) => void;
  onDelete: (id: number) => void;
}
const TicketTable = ({ tickets, onStatusChange, onDelete }: TicketTableProps) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 0, overflow: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <Table size="small" sx={{ minWidth: 1000 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{
              color: '#000', fontWeight: 700
            }}>כותרת</TableCell>
            <TableCell align="center" sx={{ color: '#000', fontWeight: 700 }}>תיאור </TableCell>
            <TableCell align="center" sx={{ color: '#000', fontWeight: 700 }}>דחיפות</TableCell>
            <TableCell align="center" sx={{ color: '#000', fontWeight: 700 }}>סטטוס </TableCell>
            <TableCell align="center" sx={{ color: '#000', fontWeight: 700 }}>תאריך פתיחה</TableCell>
            <TableCell align="center" sx={{ color: '#000', fontWeight: 700 }}>פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.length === 0 ? (
            <TableRow><TableCell colSpan={6} align="center" sx={{ py: 3 }}>אין קריאות להצגה</TableCell></TableRow>
          ) : tickets.map((ticket) => {
            return (
              <TableRow key={ticket.id} hover sx={{ '& td': { py: 2 } }}>
                <TableCell sx={{ textAlign: 'justify' }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{ticket.title}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{ticket.description}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip label={priorityLabels[ticket.priority]} color={priorityColors[ticket.priority]} size="small" />
                </TableCell>
                <TableCell align="center">
                  <TextField select size="small" value={ticket.status} onChange={(e) => onStatusChange(ticket.id, Number(e.target.value) as TicketStatus)}>
                    {statusOptions.map((s) => (
                      <MenuItem key={s} value={s}>{statusLabels[s]}</MenuItem>
                    ))}
                  </TextField>                  </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 400 }}>{new Date(ticket.createdAt).toLocaleDateString('he-IL')}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="מחק קריאה">
                    <IconButton
                      onClick={() => onDelete(ticket.id)}
                      color="error"  >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TicketTable;