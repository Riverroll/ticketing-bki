import axios from '../utils/axiosinstance';
import { Ticket } from '../types/ticketTypes';

export const fetchTickets = async (): Promise<Ticket[]> => {
  try {
    const response = await axios.get<Ticket[]>('/tickets');
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

export const createTicket = async (ticketData: FormData): Promise<Ticket> => {
  const response = await axios.post<Ticket>('/tickets', ticketData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateTicket = async (ticketId: number, ticketData: FormData): Promise<Ticket> => {
  const response = await axios.put<Ticket>(`/tickets/${ticketId}`, ticketData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteTicket = async (ticketId: number): Promise<void> => {
  await axios.delete(`/tickets/${ticketId}`);
};

export const fetchAttachment = async (filename: string): Promise<string> => {
  const response = await axios.get(`/tickets/attachments/${filename}`, { responseType: 'blob' });
  return URL.createObjectURL(response.data);
};