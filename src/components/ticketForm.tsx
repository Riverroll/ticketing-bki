import React from 'react';
import { Grid, TextField } from '@mui/material';
import { FormikProps } from 'formik';
import { FileUpload } from './fileUpload';
import { TicketFormValues } from '../types/ticketTypes';
import { DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';

interface TicketFormProps {
  formik: FormikProps<TicketFormValues>;
  fileUploadProps: {
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  };
}

export const TicketForm: React.FC<TicketFormProps> = ({ formik, fileUploadProps }) => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <TextField
        fullWidth
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title as string}
      />
    </Grid>
    {/* Add other form fields here */}
    <Grid item xs={12}>
      <FileUpload {...fileUploadProps} />
    </Grid>
  </Grid>
);
