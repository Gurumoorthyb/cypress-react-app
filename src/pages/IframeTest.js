import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Alert
} from '@mui/material';

const IframeTest = () => {
  const [message, setMessage] = useState('');
  const [iframeMessage, setIframeMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendMessage = () => {
    try {
      const iframe = document.querySelector('#test-iframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(message, '*');
        setError('');
      }
    } catch (err) {
      setError('Failed to send message to iframe');
    }
  };

  React.useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && typeof event.data === 'string') {
        setIframeMessage(event.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }} data-cy="iframe-container">
      <Typography variant="h4" component="h1" gutterBottom data-cy="iframe-title">
        iFrame Testing
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }} data-cy="message-section">
          <Typography variant="h6" gutterBottom>
            Send Message to iFrame
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              data-cy="message-input"
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              data-cy="send-message-btn"
            >
              Send
            </Button>
          </Box>
          {error && (
            <Alert severity="error" data-cy="error-message">
              {error}
            </Alert>
          )}
          {iframeMessage && (
            <Alert severity="info" data-cy="received-message">
              Received: {iframeMessage}
            </Alert>
          )}
        </Paper>

        <Paper sx={{ p: 3 }} data-cy="iframe-section">
          <Typography variant="h6" gutterBottom>
            iFrame Content
          </Typography>
          <Box
            component="iframe"
            id="test-iframe"
            src="/iframe-content.html"
            sx={{
              width: '100%',
              height: '400px',
              border: '1px solid #ccc',
            }}
            data-cy="test-iframe"
          />
        </Paper>
      </Box>

      <Paper sx={{ p: 3 }} data-cy="embedded-section">
        <Typography variant="h6" gutterBottom>
          Embedded External Content
        </Typography>
        <Box
          component="iframe"
          src="https://example.com"
          sx={{
            width: '100%',
            height: '400px',
            border: '1px solid #ccc',
          }}
          data-cy="external-iframe"
        />
      </Paper>
    </Container>
  );
};

export default IframeTest; 