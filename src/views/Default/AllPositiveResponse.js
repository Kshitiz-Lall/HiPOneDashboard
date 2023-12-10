import React, { useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import LikeIcon from '@mui/icons-material/ThumbUp';
import NullIcon from '@mui/icons-material/RemoveOutlined';
import { getConversationData } from 'store/dashboardSlice';

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#142952'
};

export default function AllPositiveResponse() {
  const originalData = useSelector(getConversationData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  // Sort data based on ID in descending order
  const sortedData = [...originalData].sort((a, b) => b.id - a.id);

  // Filter data to include only rows with true feedback
  const positiveFeedbackData = sortedData.filter((row) => row.feedback === true);

  const data = positiveFeedbackData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
    } else {
      return <NullIcon />;
    }
  };

  return (
    <>
      <Typography variant="h5" style={titleStyle}>
        All Positive Responses
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
              count={positiveFeedbackData.length}
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