import { Box, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#142952'
};

export default function ConversationTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'session_id',
      headerName: 'Session ID',
      width: 150,
      editable: false,
      sortable: true
    },
    {
      field: 'ip_address',
      headerName: 'IP Address',
      width: 150,
      editable: false,
      sortable: true
    },
    {
      field: 'date',
      headerName: 'Date',
      sortable: true,
      width: 160,
      editable: false
    },
    {
      field: 'question',
      headerName: 'Question',
      width: 160,
      editable: false
    },
    {
      field: 'answer',
      headerName: 'Response',
      width: 350,
      height: 200
    },
    {
      field: 'feedback',
      headerName: 'Feedback'
    }
  ];

  useEffect(() => {
    axios
      .get(`https://convwebsite-dev.genzeon.com/get_dashboard_data`)
      .then((response) => {
        const rows = response.data.data.map((item, index) => ({
          ...item,
          id: index.toString()
        }));
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
        Conversation Details
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
