import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import TableChartIcon from '@mui/icons-material/TableChart';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ApiIcon from '@mui/icons-material/Api';
import WebIcon from '@mui/icons-material/Web';

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const navItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Forms', path: '/forms', icon: <DynamicFormIcon /> },
    { text: 'Tables', path: '/tables', icon: <TableChartIcon /> },
    { text: 'Drag & Drop', path: '/drag-drop', icon: <DragIndicatorIcon /> },
    { text: 'Files', path: '/file-handling', icon: <UploadFileIcon /> },
    { text: 'API', path: '/api-tests', icon: <ApiIcon /> },
    { text: 'iFrame', path: '/iframe-test', icon: <WebIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      {navItems.map((item) => (
        <ListItem
          button
          component={Link}
          to={item.path}
          key={item.text}
          selected={location.pathname === item.path}
          onClick={handleDrawerToggle}
          sx={{
            borderRadius: 2,
            m: 1,
            '&.Mui-selected': {
              backgroundColor: 'primary.light',
              color: 'primary.contrastText',
            },
          }}
        >
          {item.icon}
          <ListItemText primary={item.text} sx={{ ml: 2 }} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar position="sticky" color="inherit" data-cy="main-nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Cypress Test App
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  color="primary"
                  data-cy={`nav-${item.text.toLowerCase()}`}
                  startIcon={item.icon}
                  sx={{
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: location.pathname === item.path ? '100%' : '0%',
                      height: '2px',
                      bottom: 0,
                      left: 0,
                      backgroundColor: 'primary.main',
                      transition: 'width 0.3s ease-in-out',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation; 