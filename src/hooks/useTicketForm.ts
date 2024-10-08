import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { TicketFormValues, Ticket } from '../types/ticketTypes';
import { useTicketService } from '../services/ticketService';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  priority: Yup.string().oneOf(['Low', 'Medium', 'High', 'Critical']).required('Priority is required'),
  status: Yup.string().oneOf(['Open', 'In Progress', 'Resolved', 'Closed']).required('Status is required'),
  reporter: Yup.string().required('Reporter is required'),
  category: Yup.string().required('Category is required'),
});

export const useTicketForm = (onSubmit: (ticket: Ticket) => void) => {
  const ticketService = useTicketService();

  const formik = useFormik<TicketFormValues>({
    initialValues: {
      title: '',
      description: '',
      priority: 'Low',
      status: 'Open',
      reporter: '',
      assignee: '',
      category: '',
      attachment: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const ticket = await ticketService.createTicket(values);
      onSubmit(ticket);
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    formik.setFieldValue('attachment', acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return {
    formik,
    fileUploadProps: { getRootProps, getInputProps },
  };
};