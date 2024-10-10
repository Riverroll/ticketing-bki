
import React, { useState } from 'react';
import { 
    Box, 
    Button, 
    Container, 
    Paper, 
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

import { DataTable } from '../cards/tables/dataTable';
import { Modal } from '../components/Modal';
import { useTickets } from '../hooks/useTicketForm';
import Troubleshoot from '../types/ticketTypes';

export const Ticketing: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Troubleshoot | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState<number | null>(null);
  const { tickets, fetchTickets, addTicket, updateTicket, deleteTicket } = useTickets();

  const handleOpenModal = (ticket?: Troubleshoot) => {
    setEditingTicket(ticket || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTicket(null);
  };

  const handleSubmit = async (values: FormData) => {
    try {
      if (editingTicket) {
        await updateTicket(editingTicket.ticket_id, values);
      } else {
        await addTicket(values);
      }
      handleCloseModal();
      fetchTickets();
    } catch (error) {
      console.error('Error saving ticket:', error);
    }
  };

  const handleDeleteClick = (ticketId: number) => {
    setTicketToDelete(ticketId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (ticketToDelete) {
      try {
        await deleteTicket(ticketToDelete);
        fetchTickets();
      } catch (error) {
        console.error('Error deleting ticket:', error);
      }
    }
    setDeleteDialogOpen(false);
    setTicketToDelete(null);
  };

  return (
    <Container>
      <Box sx={{mb:2}}>
        <Typography variant="h4" component="h5">
          Ticketing BKI
        </Typography>
      </Box>
      <Paper variant="outlined" sx={{padding:'20px'}}>
        <Box sx={{marginBottom:1}}> 
          <Button
            variant="contained"
            sx={{ textTransform: 'none' }}
            onClick={() => handleOpenModal()}
          >
            Add
          </Button>
        </Box>
        <DataTable 
          tickets={tickets}
          onEdit={handleOpenModal}
          onDelete={handleDeleteClick}
        />
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          editingTicket={editingTicket}
        />
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this ticket?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};
