import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useTicketForm } from '../hooks/useTicketForm';
import { TicketForm } from './ticketForm';
import { Ticket } from '../types/ticketTypes';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (ticket: Ticket) => void;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, onSubmit }) => {
  const { formik, fileUploadProps } = useTicketForm(onSubmit);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create Ticket</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TicketForm formik={formik} fileUploadProps={fileUploadProps} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};