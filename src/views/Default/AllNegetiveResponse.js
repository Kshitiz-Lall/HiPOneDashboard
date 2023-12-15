import React, { useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import DislikeIcon from '@mui/icons-material/ThumbDown';
import NullIcon from '@mui/icons-material/RemoveOutlined';
import { getConversationData } from 'store/dashboardSlice';
import { styled } from '@mui/system';

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#142952'
};

const StyledTableContainer = styled(TableContainer)({
  borderRadius: '10px',
  boxShadow: '0px 4px 20px rgba(55, 64, 161, 0.25)',
  padding: '1rem'
});

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& .MuiTableCell-root': {
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  }
}));

export default function AllNegativeResponse() {
  const originalData = useSelector(getConversationData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const sortedData = [...originalData].sort((a, b) => b.id - a.id);

  const negativeFeedbackData = sortedData.filter((row) => row.feedback === false);

  const data = negativeFeedbackData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderFeedbackIcon = (feedback) => {
    if (feedback === false) {
      return <DislikeIcon color="error" />;
    } else {
      return <NullIcon />;
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h5" style={titleStyle}>
          All Negative Responses
        </Typography>
      </Box>
      <br />
      <div className="table-page">
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '100%' }}>
            <StyledTableContainer component={Paper}>
              <Table>
                <StyledTableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Question</TableCell>
                    <TableCell align="left">Answer</TableCell>
                    <TableCell align="left">Feedback</TableCell>
                  </TableRow>
                </StyledTableHead>
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
            </StyledTableContainer>
            <TablePagination
              rowsPerPageOptions={[7, 15, 25, 50, 100]}
              component="div"
              count={negativeFeedbackData.length}
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
