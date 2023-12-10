import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { getConversationData } from 'store/dashboardSlice';

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#142952'
};

export default function ConversationTable() {
  const data = useSelector(getConversationData);

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

  return (
    <>
      <Typography variant="h5" style={titleStyle}>
        Conversation Details
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
