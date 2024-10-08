import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface Troubleshoot {
    ticket_id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    reporter: string;
    assignee: string;
    date_created: string;
    last_updated: string;
    category: string;
    attachment_id: number;
  }

  export interface Ticket {
    id?: number;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    reporter: string;
    assignee: string;
    category: string;
    dateCreated?: string;
    lastUpdated?: string;
    attachmentId?: number | null;
  }
  
  export interface TicketFormValues {
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
    reporter: string;
    assignee: string;
    category: string;
    attachment: File | null;
  }

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