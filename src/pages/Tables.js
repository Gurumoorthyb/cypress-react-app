import React, { useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  TableSortLabel,
  Box
} from '@mui/material';

const createData = (id, name, email, role, status) => ({
  id,
  name,
  email,
  role,
  status,
});

const initialRows = [
  createData(1, 'John Doe', 'john@example.com', 'Admin', 'Active'),
  createData(2, 'Jane Smith', 'jane@example.com', 'User', 'Inactive'),
  createData(3, 'Bob Johnson', 'bob@example.com', 'User', 'Active'),
  createData(4, 'Alice Brown', 'alice@example.com', 'Editor', 'Active'),
  createData(5, 'Charlie Wilson', 'charlie@example.com', 'User', 'Inactive'),
  createData(6, 'Diana Miller', 'diana@example.com', 'Admin', 'Active'),
  createData(7, 'Edward Davis', 'edward@example.com', 'Editor', 'Active'),
  createData(8, 'Frank Thomas', 'frank@example.com', 'User', 'Inactive'),
  createData(9, 'Grace Lee', 'grace@example.com', 'User', 'Active'),
  createData(10, 'Henry White', 'henry@example.com', 'Editor', 'Active'),
];

const Tables = () => {
  const [rows] = useState(initialRows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [filterText, setFilterText] = useState('');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
    setPage(0);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row)
      .join(' ')
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  const sortedRows = filteredRows.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const headCells = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
    { id: 'status', label: 'Status' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} data-cy="tables-container">
      <Typography variant="h4" component="h1" gutterBottom data-cy="tables-title">
        Table Testing
      </Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Filter"
          value={filterText}
          onChange={handleFilterChange}
          data-cy="table-filter"
        />
      </Box>

      <TableContainer component={Paper} data-cy="table-container">
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                  data-cy={`header-${headCell.id}`}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={() => handleRequestSort(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow
                key={row.id}
                data-cy={`row-${row.id}`}
                hover
              >
                <TableCell data-cy={`cell-name-${row.id}`}>{row.name}</TableCell>
                <TableCell data-cy={`cell-email-${row.id}`}>{row.email}</TableCell>
                <TableCell data-cy={`cell-role-${row.id}`}>{row.role}</TableCell>
                <TableCell data-cy={`cell-status-${row.id}`}>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        data-cy="table-pagination"
      />
    </Container>
  );
};

export default Tables; 