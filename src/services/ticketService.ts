import axios from 'axios';
import { Troubleshoot } from '../types/ticketTypes';

const API_URL = import.meta.env.VITE_API_URL;

export const getTickets = async (): Promise<Troubleshoot[]> => {
    const response = await axios.get(`${API_URL}/tickets`);
    return response.data;
};

export const createTicket = async (ticket: Troubleshoot): Promise<Troubleshoot> => {
    const response = await axios.post(`${API_URL}/tickets`, ticket);
    return response.data;
};

export const updateTicket = async (ticket: Troubleshoot): Promise<Troubleshoot> => {
    const response = await axios.put(`${API_URL}/tickets/${ticket.ticket_id}`, ticket);
    return response.data;
};

export const deleteTicket = async (ticketId: number): Promise<void> => {
    await axios.delete(`${API_URL}/tickets/${ticketId}`);
};

export const useTicketService = () => {
    const createTicket = async (ticketData: Partial<Ticket>): Promise<Ticket> => {
      const response = await axios.post<Ticket>('/api/tickets', ticketData);
      return response.data;
    };
  
    return { createTicket };
  };