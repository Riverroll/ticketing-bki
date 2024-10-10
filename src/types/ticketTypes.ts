
export interface Ticket {
  ticket_id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  reporter: string;
  assignee: string;
  date_created: string;
  last_updated: string;
  category: string;
  attachment_id: number | null;
  filename?: string;
  original_name?: string;
}

export interface Attachment {
  id: number;
  ticket_id: number;
  filename: string;
  original_name: string;
  mime_type: string;
  uploaded_at: string;
}
