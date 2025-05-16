import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';

const ApiTests = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
      setPosts(response.data);
    } catch (err) {
      setError('Failed to fetch posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: newPost.title,
        body: newPost.body,
        userId: 1
      });
      setPosts(prevPosts => [response.data, ...prevPosts]);
      setNewPost({ title: '', body: '' });
      setSuccessMessage('Post created successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      setSuccessMessage('Post deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }} data-cy="api-tests-container">
      <Typography variant="h4" component="h1" gutterBottom data-cy="api-tests-title">
        API Testing
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }} data-cy="create-post-section">
        <Typography variant="h6" gutterBottom>
          Create New Post
        </Typography>
        <form onSubmit={handleSubmit} data-cy="create-post-form">
          <TextField
            fullWidth
            label="Title"
            value={newPost.title}
            onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
            margin="normal"
            required
            data-cy="post-title-input"
          />
          <TextField
            fullWidth
            label="Body"
            value={newPost.body}
            onChange={(e) => setNewPost(prev => ({ ...prev, body: e.target.value }))}
            margin="normal"
            required
            multiline
            rows={4}
            data-cy="post-body-input"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            data-cy="submit-post-btn"
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Create Post'}
          </Button>
        </form>
      </Paper>

      {(error || successMessage) && (
        <Box sx={{ mb: 3 }}>
          {error && (
            <Alert severity="error" data-cy="error-message">
              {error}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" data-cy="success-message">
              {successMessage}
            </Alert>
          )}
        </Box>
      )}

      <Paper sx={{ p: 3 }} data-cy="posts-list-section">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Posts
          </Typography>
          <Button
            variant="outlined"
            onClick={fetchPosts}
            disabled={loading}
            data-cy="refresh-posts-btn"
          >
            Refresh Posts
          </Button>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }} data-cy="loading-indicator">
            <CircularProgress />
          </Box>
        )}

        <List data-cy="posts-list">
          {posts.map((post) => (
            <React.Fragment key={post.id}>
              <ListItem data-cy={`post-item-${post.id}`}>
                <ListItemText
                  primary={post.title}
                  secondary={post.body}
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(post.id)}
                  data-cy={`delete-post-${post.id}`}
                >
                  Delete
                </Button>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>

        {!loading && posts.length === 0 && (
          <Typography 
            color="text.secondary" 
            align="center"
            data-cy="no-posts-message"
          >
            No posts found
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ApiTests; 