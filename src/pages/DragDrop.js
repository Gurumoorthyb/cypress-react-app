import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Grid } from '@mui/material';

const DragDrop = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [items] = useState([
    { id: 1, content: 'Item 1' },
    { id: 2, content: 'Item 2' },
    { id: 3, content: 'Item 3' },
  ]);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', ''); // Required for Firefox
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    console.log('Dropped item:', draggedItem);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} data-cy="dragdrop-container">
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        data-cy="dragdrop-title"
        sx={{
          color: '#FFD700',
          textShadow: '0 0 10px rgba(255, 215, 0, 0.3)',
          mb: 4,
          textAlign: 'center'
        }}
      >
        Drag and Drop Testing
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Draggable items */}
        <Grid item xs={12} md={5}>
          <Paper 
            sx={{ 
              p: 3,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              borderRadius: 2
            }}
            data-cy="draggable-container"
          >
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                color: '#FFD700',
                textShadow: '0 0 8px rgba(255, 215, 0, 0.2)',
                mb: 3
              }}
            >
              Draggable Items
            </Typography>
            {items.map((item) => (
              <Paper
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                sx={{
                  p: 2,
                  mb: 2,
                  cursor: 'grab',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255, 215, 0, 0.1)',
                  color: '#fff',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    background: 'rgba(255, 215, 0, 0.1)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    boxShadow: '0 4px 20px rgba(255, 215, 0, 0.15)'
                  },
                  '&:active': {
                    cursor: 'grabbing',
                    transform: 'translateY(0)',
                  }
                }}
                data-cy={`draggable-item-${item.id}`}
              >
                <Typography sx={{ fontWeight: 500 }}>
                  {item.content}
                </Typography>
              </Paper>
            ))}
          </Paper>
        </Grid>

        {/* Drop zone */}
        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              p: 3,
              minHeight: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '2px dashed rgba(255, 215, 0, 0.3)',
              borderRadius: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                borderColor: 'rgba(255, 215, 0, 0.5)',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.1)'
              }
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            data-cy="drop-zone"
          >
            <Typography 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.1rem',
                fontWeight: 500,
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
              }}
            >
              Drop items here
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DragDrop; 