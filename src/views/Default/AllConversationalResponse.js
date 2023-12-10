import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  IconButton
} from '@mui/material';
import { useSelector } from 'react-redux';
import { getConversationData } from 'store/dashboardSlice';
import LikeIcon from '@mui/icons-material/ThumbUp';
import DislikeIcon from '@mui/icons-material/ThumbDown';
import NullIcon from '@mui/icons-material/RemoveOutlined';

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#142952'
};

export default function AllConversationalResponse() {
  const originalData = useSelector(getConversationData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  // Sort data based on ID in descending order
  const sortedData = [...originalData].sort((a, b) => b.id - a.id);

  const data = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderFeedbackIcon = (feedback) => {
    if (feedback === true) {
      return <LikeIcon color="primary" />;
    } else if (feedback === false) {
      return <DislikeIcon color="error" />;
    } else {
      return <NullIcon />;
    }
  };

  return (
    <>
      <Typography variant="h5" style={titleStyle}>
        Conversation Details
      </Typography>
      <br />
      <div className="table-page">
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '100%' }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="left">Session ID</TableCell>
                    <TableCell align="left">IP Address</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Question</TableCell>
                    <TableCell align="left">Answer</TableCell>
                    <TableCell align="left">Feedback</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell align="left">{row.session_id}</TableCell>
                      <TableCell align="left">{row.ip_address}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.question}</TableCell>
                      <TableCell align="left">{row.answer}</TableCell>
                      <TableCell align="left">{renderFeedbackIcon(row.feedback)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[7, 15, 25, 50, 100]}
              component="div"
              count={sortedData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      </div>
    </>
  );
}
