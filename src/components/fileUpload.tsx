import React from 'react';
import { Box, Typography } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';

interface FileUploadProps {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
}

export const FileUpload: React.FC<FileUploadProps> = ({ getRootProps, getInputProps }) => (
  <Box {...getRootProps()} sx={{ border: '2px dashed #ccc', borderRadius: 2, p: 2, textAlign: 'center', cursor: 'pointer' }}>
    <input {...getInputProps()} />
    <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
    <Typography variant="body1">Drag & Drop or Select file</Typography>
  </Box>
);