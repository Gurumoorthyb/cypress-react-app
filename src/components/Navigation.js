import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Navigation = () => {
  return (
    <AppBar position="static" data-cy="main-nav">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cypress Test App
        </Typography>
        <Button color="inherit" component={Link} to="/" data-cy="nav-home">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/forms" data-cy="nav-forms">
          Forms
        </Button>
        <Button color="inherit" component={Link} to="/tables" data-cy="nav-tables">
          Tables
        </Button>
        <Button color="inherit" component={Link} to="/drag-drop" data-cy="nav-dragdrop">
          Drag & Drop
        </Button>
        <Button color="inherit" component={Link} to="/file-handling" data-cy="nav-files">
          Files
        </Button>
        <Button color="inherit" component={Link} to="/api-tests" data-cy="nav-api">
          API
        </Button>
        <Button color="inherit" component={Link} to="/iframe-test" data-cy="nav-iframe">
          iFrame
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation; 