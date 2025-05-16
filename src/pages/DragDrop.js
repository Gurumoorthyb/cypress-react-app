import React, { useState } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

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
      <Typography variant="h4" component="h1" gutterBottom data-cy="dragdrop-title">
        Drag and Drop Testing
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        {/* Draggable items */}
        <Paper 
          sx={{ 
            p: 2, 
            width: '200px',
            backgroundColor: '#f5f5f5'
          }}
          data-cy="draggable-container"
        >
          <Typography variant="h6" gutterBottom>
            Draggable Items
          </Typography>
          {items.map((item) => (
            <Paper
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              sx={{
                p: 2,
                mb: 1,
                cursor: 'grab',
                '&:hover': {
                  backgroundColor: '#e0e0e0'
                }
              }}
              data-cy={`draggable-item-${item.id}`}
            >
              {item.content}
            </Paper>
          ))}
        </Paper>

        {/* Drop zone */}
        <Paper
          sx={{
            p: 2,
            width: '300px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #ccc'
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-cy="drop-zone"
        >
          <Typography>Drop items here</Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default DragDrop; 