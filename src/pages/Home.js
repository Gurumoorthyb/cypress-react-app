import React from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';

const Home = () => {
  const features = [
    {
      title: 'Form Testing',
      description: 'Test various form elements including inputs, checkboxes, radio buttons, and validations',
      path: '/forms'
    },
    {
      title: 'Table Interactions',
      description: 'Test table sorting, filtering, and pagination functionality',
      path: '/tables'
    },
    {
      title: 'Drag and Drop',
      description: 'Test drag and drop functionality with different elements',
      path: '/drag-drop'
    },
    {
      title: 'File Operations',
      description: 'Test file upload and download functionality',
      path: '/file-handling'
    },
    {
      title: 'API Testing',
      description: 'Test API calls, loading states, and error handling',
      path: '/api-tests'
    },
    {
      title: 'iFrame Testing',
      description: 'Test interactions with iframes and embedded content',
      path: '/iframe-test'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} data-cy="home-container">
      <Typography variant="h2" component="h1" gutterBottom data-cy="home-title">
        Cypress Testing Playground
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom color="textSecondary" data-cy="home-subtitle">
        Explore different features and write comprehensive end-to-end tests
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              data-cy={`feature-card-${index}`}
              sx={{ 
                height: '100%',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out'
                }
              }}
            >
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
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