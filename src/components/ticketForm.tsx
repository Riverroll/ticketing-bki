import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Select, MenuItem, Button, Grid } from '@mui/material';
import * as Yup from 'yup';
import FileUpload from './fileUpload';
import { Troubleshoot } from '../types/ticketTypes';

interface TicketFormProps {
  onSubmit: (values: FormData) => Promise<void>;
  initialValues: Troubleshoot | null;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  priority: Yup.string().required('Priority is required'),
  status: Yup.string().required('Status is required'),
  reporter: Yup.string().required('Reporter is required'),
  assignee: Yup.string().required('Assignee is required'),
  category: Yup.string().required('Category is required')
});

export const TicketForm: React.FC<TicketFormProps> = ({ onSubmit, initialValues }) => {
  return (
    <Formik
      initialValues={initialValues || {
        title: '',
        description: '',
        priority: 'Low',
        status: 'Open',
        reporter: '',
        assignee: '',
        category: '',
        attachment: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          if (key === 'attachment' && values[key]) {
            formData.append('attachment', values[key]);
          } else if (values[key] !== null && values[key] !== undefined) {
            formData.append(key, values[key]);
          }
        });
        onSubmit(formData).finally(() => setSubmitting(false));
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="title"
                label="Title"
                fullWidth
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="description"
                label="Description"
                multiline
                rows={4}
                fullWidth
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={Select}
                name="priority"
                label="Priority"
                fullWidth
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field
                as={Select}
                name="status"
                label="Status"
                fullWidth
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="reporter"
                label="Reporter"
                fullWidth
                error={touched.reporter && Boolean(errors.reporter)}
                helperText={touched.reporter && errors.reporter}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="assignee"
                label="Assignee"
                fullWidth
                error={touched.assignee && Boolean(errors.assignee)}
                helperText={touched.assignee && errors.assignee}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                name="category"
                label="Category"
                fullWidth
                error={touched.category && Boolean(errors.category)}
                helperText={touched.category && errors.category}
              />
            </Grid>
            <Grid item xs={12}>
              <FileUpload name="attachment" />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

