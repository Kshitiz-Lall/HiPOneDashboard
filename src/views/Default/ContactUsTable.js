import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { getContactUsData } from 'store/dashboardSlice';

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#142952'
};

export default function ContactUsTable() {
  const data = useSelector(getContactUsData);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'first_name',
      headerName: 'First Name',
      width: 120,
      editable: false
    },
    {
      field: 'last_name',
      headerName: 'Last Name',
      sortable: true,
      width: 120,
      editable: false
    },
    {
      field: 'date',
      headerName: 'Date',
      sortable: true,
      width: 150,
      editable: false
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: true,
      width: 250
    },
    {
      field: 'contact_number',
      headerName: 'Contact Number',
      width: 200,
      editable: false
    },
    {
      field: 'content',
      headerName: 'Comment',
      width: 400,
      editable: false
    }
  ];

  return (
    <>
      <Typography variant="h5" style={titleStyle}>
        Contact Us Details
      </Typography>
      <div className="table-page">
        {
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ height: '100%', width: '100%' }}>
              <DataGrid rows={data} columns={columns} pageSize={7} checkboxSelection disableRowSelectionOnClick />
            </Box>
          </Box>
        }
      </div>
    </>
  );
}
