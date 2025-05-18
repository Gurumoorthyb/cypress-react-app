import React from 'react';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Engagement from '../components/Engagement';

const Home = () => {
  const features = [
    {
      title: 'Form Testing',
      description: 'Test various form elements including inputs, checkboxes, radio buttons, and validations',
      path: '/forms',
      gradient: 'linear-gradient(135deg, #FFD700 0%, #FFC107 100%)'
    },
    {
      title: 'Table Interactions',
      description: 'Test table sorting, filtering, and pagination functionality',
      path: '/tables',
      gradient: 'linear-gradient(135deg, #FF4081 0%, #FF79B0 100%)'
    },
    {
      title: 'Drag and Drop',
      description: 'Test drag and drop functionality with different elements',
      path: '/drag-drop',
      gradient: 'linear-gradient(135deg, #FFE55C 0%, #FFD700 100%)'
    },
    {
      title: 'File Operations',
      description: 'Test file upload and download functionality',
      path: '/file-handling',
      gradient: 'linear-gradient(135deg, #FF79B0 0%, #FF4081 100%)'
    },
    {
      title: 'API Testing',
      description: 'Test API calls, loading states, and error handling',
      path: '/api-tests',
      gradient: 'linear-gradient(135deg, #FFC107 0%, #FFD700 100%)'
    },
    {
      title: 'iFrame Testing',
      description: 'Test interactions with iframes and embedded content',
      path: '/iframe-test',
      gradient: 'linear-gradient(135deg, #FFE55C 0%, #FFC107 100%)'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} data-cy="home-container">
      <Engagement />
      
      <Box 
        sx={{ 
          mb: 8, 
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: -100,
            right: -200,
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
            zIndex: -1,
            pointerEvents: 'none',
          }
        }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom 
          data-cy="home-title"
          sx={{
            fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
            fontWeight: 700,
            textAlign: 'center',
            mb: 3,
            textShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
          }}
        >
          Cypress Testing Playground
        </Typography>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          color="textSecondary" 
          data-cy="home-subtitle"
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            mb: 6,
            opacity: 0.9,
          }}
        >
          Explore different features and write comprehensive end-to-end tests
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              component={Link}
              to={feature.path}
              data-cy={`feature-card-${index}`}
              sx={{ 
                height: '100%',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                background: 'rgba(18, 18, 18, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 215, 0, 0.1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  border: '1px solid rgba(255, 215, 0, 0.5)',
                  boxShadow: '0 12px 24px rgba(255, 215, 0, 0.2)',
                  '& .card-gradient': {
                    opacity: 0.15,
                  },
                },
              }}
            >
              <Box
                className="card-gradient"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: feature.gradient,
                  opacity: 0.1,
                  transition: 'opacity 0.3s ease-in-out',
                }}
              />
              <CardContent sx={{ position: 'relative', p: 4 }}>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    background: feature.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 10px rgba(255, 215, 0, 0.2)',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  sx={{ 
                    lineHeight: 1.6,
                    opacity: 0.9,
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 