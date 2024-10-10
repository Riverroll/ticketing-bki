import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, IconButton } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useField, useFormikContext } from 'formik';

interface FileUploadProps {
  name: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ name }) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFieldValue(name, file);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setThumbnail(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setThumbnail(null);
      }
    }
  }, [setFieldValue, name]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveFile = () => {
    setThumbnail(null);
    setFieldValue(name, null);
  };

  return (
    <Box 
      {...getRootProps()}
      sx={{
        border: '2px dashed #ccc',
        borderRadius: 2,
        padding: 3,
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isDragActive ? '#f0f0f0' : 'transparent',
      }}
    >
      <input {...getInputProps()} />
      {thumbnail ? (
        <Box>
          <img src={thumbnail} alt="File thumbnail" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
            <Typography variant="body2" mr={1}>
              {field.value?.name || "File selected"}
            </Typography>
            <IconButton 
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <>
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', marginBottom: 1 }} />
          <Typography variant="h6" gutterBottom>
            Drag & Drop or Select file
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Drop files here or click <span style={{ color: '#1976d2', cursor: 'pointer' }}>browse</span> through your device
          </Typography>
        </>
      )}
    </Box>
  );
};

export default FileUpload;
