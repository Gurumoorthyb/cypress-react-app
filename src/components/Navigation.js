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
  ListItemIcon,
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
    <List sx={{ pt: 2 }}>
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
            background: location.pathname === item.path ? 'rgba(0, 180, 216, 0.1)' : 'transparent',
            '&:hover': {
              background: 'rgba(0, 180, 216, 0.05)',
            },
          }}
        >
          <ListItemIcon sx={{ 
            color: location.pathname === item.path ? '#00b4d8' : 'inherit',
            minWidth: 40 
          }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText 
            primary={item.text} 
            sx={{ 
              color: location.pathname === item.path ? '#00b4d8' : 'inherit'
            }} 
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar 
      position="sticky" 
      color="inherit" 
      data-cy="main-nav"
      sx={{
        background: 'rgba(10, 25, 41, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              background: 'linear-gradient(45deg, #00b4d8 30%, #48cae4 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
              letterSpacing: 1,
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
                sx={{ 
                  display: { md: 'none' },
                  background: 'rgba(255, 255, 255, 0.05)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
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
                  '& .MuiDrawer-paper': { 
                    boxSizing: 'border-box', 
                    width: 280,
                    background: 'rgba(10, 25, 41, 0.95)',
                    backdropFilter: 'blur(20px)',
                  },
                }}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  color="primary"
                  data-cy={`nav-${item.text.toLowerCase()}`}
                  startIcon={item.icon}
                  sx={{
                    px: 2,
                    py: 1,
                    position: 'relative',
                    color: location.pathname === item.path ? '#00b4d8' : 'inherit',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: location.pathname === item.path ? '100%' : '0%',
                      height: '2px',
                      bottom: 0,
                      left: 0,
                      background: 'linear-gradient(90deg, #00b4d8, #48cae4)',
                      transition: 'width 0.3s ease-in-out',
                    },
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.05)',
                      '&::after': {
                        width: '100%',
                      },
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