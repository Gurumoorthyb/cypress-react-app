import React, { useState, useRef } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

const FileHandling = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef();

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    fileInputRef.current.value = '';
  };

  const simulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    setMessage(null);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setMessage({ type: 'success', text: 'Files uploaded successfully!' });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleUpload = () => {
    if (files.length === 0) {
      setMessage({ type: 'error', text: 'Please select files to upload' });
      return;
    }
    simulateUpload();
  };

  const handleDelete = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleDownload = (file) => {
    // Create a URL for the file
    const url = URL.createObjectURL(file);
    
    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    
    // Trigger the download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }} data-cy="file-handling-container">
      <Typography variant="h4" component="h1" gutterBottom data-cy="file-handling-title">
        File Handling Testing
      </Typography>

      {message && (
        <Alert 
          severity={message.type} 
          sx={{ mb: 2 }}
          data-cy="file-message"
        >
          {message.text}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }} data-cy="upload-section">
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          ref={fileInputRef}
          data-cy="file-input"
        />
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={() => fileInputRef.current.click()}
            data-cy="select-files-btn"
          >
            Select Files
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
            data-cy="upload-btn"
          >
            Upload Files
          </Button>
        </Box>

        {uploading && (
          <Box sx={{ width: '100%', mb: 2 }} data-cy="upload-progress">
            <LinearProgress variant="determinate" value={uploadProgress} />
            <Typography variant="body2" color="text.secondary" align="center">
              {uploadProgress}%
            </Typography>
          </Box>
        )}

        <List data-cy="file-list">
          {files.map((file, index) => (
            <ListItem key={index} data-cy={`file-item-${index}`}>
              <ListItemText
                primary={file.name}
                secondary={`${(file.size / 1024).toFixed(2)} KB`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="download"
                  onClick={() => handleDownload(file)}
                  data-cy={`download-btn-${index}`}
                >
                  <DownloadIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(index)}
                  data-cy={`delete-btn-${index}`}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 3 }} data-cy="download-section">
        <Typography variant="h6" gutterBottom>
          Sample Files for Download
        </Typography>
        <List>
          <ListItem data-cy="sample-file-1">
            <ListItemText
              primary="sample.txt"
              secondary="Click to download a sample text file"
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="download sample"
                onClick={() => {
                  const content = 'This is a sample text file content.';
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'sample.txt';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                data-cy="download-sample-btn"
              >
                <DownloadIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default FileHandling; 