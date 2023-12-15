import React, { useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { getContactUsData } from 'store/dashboardSlice';
import { styled } from '@mui/system';
import { TypeAnimation } from 'react-type-animation';

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

export default function ContactUsTable() {
  const data = useSelector(getContactUsData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

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
      width: 250,
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <br />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h5" style={titleStyle}>
          Contact Us Details
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
                    {columns.map((column) => (
                      <TableCell key={column.field} style={{ width: column.width }}>
                        {column.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row.id}>
                      {columns.map((column) => (
                        <TableCell key={column.field}>{row[column.field]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
            <TablePagination
              rowsPerPageOptions={[7, 15, 25, 50, 100]}
              component="div"
              count={data.length}
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
