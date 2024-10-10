import React from 'react';
import { 
    DataGrid, 
    GridColDef, 
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector
} from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Troubleshoot } from '../types/ticketTypes';

interface DataTableProps {
  tickets: Troubleshoot[];
  onEdit: (ticket: Troubleshoot) => void;
  onDelete: (ticketId: number) => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export const DataTable: React.FC<DataTableProps> = ({ tickets, onEdit, onDelete }) => {
  const columns: GridColDef[] = [
    { field: 'ticket_id', headerName: 'ID', width: 50 },
    {
      field: 'actions',
      headerName: 'Aksi',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button onClick={() => onEdit(params.row as Troubleshoot)}>
            <EditIcon />
          </Button>
          <Button onClick={() => onDelete(params.row.ticket_id)}>
            <DeleteForeverIcon />
          </Button>
        </Box>
      ),
    },
    { field: 'title', headerName: 'Judul', width: 200 },
    { field: 'description', headerName: 'Deskripsi', width: 400 },
    { field: 'priority', headerName: 'Level Prioritas', width: 120 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'reporter', headerName: 'Pelapor', width: 120 },
    { field: 'assignee', headerName: 'PJ', width: 120 },
    { field: 'date_created', headerName: 'Tanggal dibuat', width: 180 },
    { field: 'last_updated', headerName: 'Update terbaru', width: 180 },
    { field: 'category', headerName: 'Kategori', width: 130 },
    { 
      field: 'attachment_id', 
      headerName: 'Lampiran', 
      width: 150,
      renderCell: (params) => {
        if (params.row.filename) {
          return (
            <Box
              component="img"
              sx={{
                height: 50,
                width: 50,
                objectFit: 'cover',
                cursor: 'pointer'
              }}
              alt={params.row.original_name}
              src={`${API_URL}/tickets/attachments/${params.row.filename}`}
              onClick={() => window.open(`${API_URL}/tickets/attachments/${params.row.filename}`, '_blank')}
            />
          );
        }
        return null;
      }
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{p:1}}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <DataGrid
      rows={tickets}
      columns={columns}
      getRowId={(row) => row.ticket_id}
      slots={{
        toolbar: CustomToolbar
      }}
      sx={{
        border: 'none',
        bgcolor: '#fff',
        '& .MuiDataGrid-cell': {
          bgcolor: '#fff',
          border: 'none',
        },
        '& .MuiDataGrid-columnHeaders': {
          bgcolor: '#f5f5f5',
        },
      }}
    />
  );
};