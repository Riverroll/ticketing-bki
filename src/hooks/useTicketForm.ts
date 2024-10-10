import { useState, useEffect } from 'react';
import * as ticketService from '../services/ticketService';
import { Ticket } from '../types/ticketTypes';

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = async () => {
    try {
      const fetchedTickets = await ticketService.fetchTickets();
      setTickets(fetchedTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const addTicket = async (ticketData: FormData) => {
    try {
      await ticketService.createTicket(ticketData);
      fetchTickets();
    } catch (error) {
      console.error('Error adding ticket:', error);
    }
  };

  const updateTicket = async (id: number, ticketData: FormData) => {
    try {
      await ticketService.updateTicket(id, ticketData);
      fetchTickets();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const deleteTicket = async (id: number) => {
    try {
      await ticketService.deleteTicket(id);
      fetchTickets();
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return { tickets, fetchTickets, addTicket, updateTicket, deleteTicket };
};