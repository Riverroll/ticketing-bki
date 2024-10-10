import { GridColDef } from '@mui/x-data-grid';

export const useTableColumns = () => {
  const columns: GridColDef[] = [
    { field: 'ticket_id', headerName: 'ID', width: 50 },
    { field: 'title', headerName: 'Judul', width: 200 },
    { field: 'description', headerName: 'Deskripsi', width: 400 },
    { field: 'priority', headerName: 'Level Prioritas', width: 120 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'reporter', headerName: 'Pelapor', width: 120 },
    { field: 'assignee', headerName: 'PJ', width: 120 },
    { field: 'date_created', headerName: 'Tanggal dibuat', width: 180 },
    { field: 'last_updated', headerName: 'Update terbaru', width: 180 },
    { field: 'category', headerName: 'Kategori', width: 130 },
    // Add attachment column if needed
  ];

  return columns;
};