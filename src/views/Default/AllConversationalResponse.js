import { TransitionGroup, CSSTransition } from 'react-transition-group';
import NullIcon from '@mui/icons-material/RemoveOutlined';
import DislikeIcon from '@mui/icons-material/ThumbDown';
import LikeIcon from '@mui/icons-material/ThumbUp';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';
import * as React from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import './Common.css';
import { getConversationData } from 'store/dashboardSlice';

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#142952',
  textAlign: 'center'
};

const StyledTableContainer = styled(TableContainer)({
  borderRadius: '10px',
  boxShadow: '0px 4px 20px rgba(55, 64, 161, 0.25)',
  padding: '1rem',
  backdropFilter: 'blur(10px)'
});

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& .MuiTableCell-root': {
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  }
}));

export default function AllConversationalResponse() {
  const originalData = useSelector(getConversationData);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [searchTerm, setSearchTerm] = React.useState('');

  const sortedData = [...originalData].sort((a, b) => b.id - a.id);

  const filteredData = sortedData.filter((row) =>
    Object.values(row).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const data = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h5" style={titleStyle}>
          Conversation Details
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
                    <TableCell align="left">Session ID</TableCell>
                    <TableCell align="left">IP Address</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Question</TableCell>
                    <TableCell align="left">Answer</TableCell>
                    <TableCell align="left">Feedback</TableCell>
                  </TableRow>
                </StyledTableHead>
                <TransitionGroup component={TableBody}>
                  {data.map((row) => (
                    <CSSTransition key={row.id} timeout={500} classNames="item">
                      <TableRow>
                        <TableCell>{row.id}</TableCell>
                        <TableCell align="left">{row.session_id}</TableCell>
                        <TableCell align="left">{row.ip_address}</TableCell>
                        <TableCell align="left">{row.date}</TableCell>
                        <TableCell align="left">{row.question}</TableCell>
                        <TableCell align="left">{row.answer}</TableCell>
                        <TableCell align="left">{renderFeedbackIcon(row.feedback)}</TableCell>
                      </TableRow>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </Table>
            </StyledTableContainer>
            <TablePagination
              rowsPerPageOptions={[7, 15, 25, 50, 100]}
              component="div"
              count={filteredData.length}
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
