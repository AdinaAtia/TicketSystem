import { TicketStatus, Priority } from './types';

export const priorityLabels: Record<Priority, string> = { 
  [Priority.Low]: 'נמוכה',
  [Priority.Medium]: 'בינונית',
  [Priority.High]: 'גבוהה',
};

export const priorityColors: Record<Priority, 'default' | 'warning' | 'error'> = { 
  [Priority.Low]: 'default',
  [Priority.Medium]: 'warning',
  [Priority.High]: 'error',
};

export const statusLabels: Record<TicketStatus, string> = {
  [TicketStatus.Open]: 'פתוח',
  [TicketStatus.InProgress]: 'בטיפול',
  [TicketStatus.Closed]: 'סגור',
};

export const priorityOptions = [Priority.Low, Priority.Medium, Priority.High];
export const statusOptions = [TicketStatus.Open, TicketStatus.InProgress, TicketStatus.Closed];