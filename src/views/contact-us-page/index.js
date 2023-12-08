import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, CircularProgress } from '@mui/material';

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#142952'
};

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

export default function ContactUsTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://convwebsite-dev.genzeon.com/get_feedback_data`)
      .then((response) => {
        const rows = response.data.data.map((item, index) => ({
          ...item,
          id: index.toString()
        }));

        rows.sort((a, b) => b.id - a.id);
        setData(rows);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data from the backend:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Typography variant="h5" style={titleStyle}>
        Contact Us Details
      </Typography>
      <div className="table-page">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ height: '100%', width: '100%' }}>
              <DataGrid rows={data} columns={columns} pageSize={7} checkboxSelection disableRowSelectionOnClick />
            </Box>
          </Box>
        )}
      </div>
    </>
  );
}
