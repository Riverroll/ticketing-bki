import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { TicketForm } from './ticketForm';
import { Troubleshoot } from '../types/ticketTypes';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: FormData) => Promise<void>;
  editingTicket: Troubleshoot | null;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, onSubmit, editingTicket }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{editingTicket ? 'Edit Ticket' : 'Create Ticket'}</DialogTitle>
      <DialogContent>
        <TicketForm
          onSubmit={onSubmit}
          initialValues={editingTicket}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};