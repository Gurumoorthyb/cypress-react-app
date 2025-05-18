import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Divider,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Send as SendIcon,
  ThumbUp as ThumbUpIcon,
  AdminPanelSettings as AdminIcon,
  ExpandMore as ExpandMoreIcon,
  Comment as CommentIcon,
} from '@mui/icons-material';

const Engagement = () => {
  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem('comments');
    return savedComments ? JSON.parse(savedComments) : [];
  });
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('likes');
    return savedLikes ? JSON.parse(savedLikes) : 0;
  });
  const [hasLiked, setHasLiked] = useState(() => {
    return localStorage.getItem('hasLiked') === 'true';
  });
  const [isAdminView, setIsAdminView] = useState(false);
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const ADMIN_PASSWORD = 'admin123'; // You should change this to your desired password

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  useEffect(() => {
    localStorage.setItem('hasLiked', hasLiked);
  }, [hasLiked]);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (newComment.trim() && name.trim()) {
      const newCommentObj = {
        id: Date.now(),
        name: name,
        text: newComment,
        timestamp: new Date().toISOString(),
        likes: 0,
      };
      setComments(prev => [newCommentObj, ...prev]);
      setNewComment('');
      setName('');
    }
  };

  const handleCommentLike = (commentId) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdminView(true);
      setAdminDialogOpen(false);
      setAdminPassword('');
    }
  };

  return (
    <Box sx={{ mt: 'auto', pt: 2 }}>
      <Accordion
        sx={{
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 215, 0, 0.2)',
          '&:before': {
            display: 'none',
          },
          borderRadius: '8px !important',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#FFD700' }} />}
          sx={{
            borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
            minHeight: '48px !important',
            '& .MuiAccordionSummary-content': {
              margin: '8px 0 !important',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', pr: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CommentIcon sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
              <Typography
                sx={{
                  color: 'rgba(255, 215, 0, 0.8)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              >
                Feedback & Comments
              </Typography>
            </Box>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                ml: 'auto',
                mr: 1,
                background: 'rgba(255, 215, 0, 0.05)',
                borderRadius: 1,
                p: 0.5,
                pr: 1.5,
              }}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  if (!hasLiked) handleLike();
                }}
                disabled={hasLiked}
                size="small"
                sx={{ p: 0.5 }}
              >
                {hasLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
              </IconButton>
              <Typography
                sx={{
                  ml: 0.5,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.8rem',
                }}
              >
                {likes}
              </Typography>
            </Box>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setAdminDialogOpen(true);
              }}
              size="small"
              sx={{
                color: isAdminView ? '#FFD700' : 'rgba(255, 215, 0, 0.3)',
                padding: 0.5,
              }}
            >
              <AdminIcon fontSize="small" />
            </IconButton>
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={{ p: 2 }}>
          {/* Comment Form */}
          <Paper
            elevation={0}
            sx={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 2,
              p: 2,
              mb: 2,
              border: '1px solid rgba(255, 215, 0, 0.1)',
            }}
          >
            <Box
              component="form"
              onSubmit={handleComment}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              <TextField
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                size="small"
                required
                InputProps={{
                  sx: {
                    borderRadius: 1.5,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    },
                  }
                }}
              />
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <TextField
                  placeholder="Write your comment here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  multiline
                  rows={2}
                  InputProps={{
                    sx: {
                      borderRadius: 1.5,
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      },
                    }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{
                    height: '40px',
                    minWidth: '80px',
                    borderRadius: 1.5,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(255, 215, 0, 0.3)',
                    },
                  }}
                >
                  Post
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Comments List - Only visible in admin view */}
          {isAdminView && (
            <>
              <Typography
                variant="subtitle2"
                sx={{
                  color: '#FFD700',
                  mb: 2,
                }}
              >
                Admin View - All Comments
              </Typography>
              <List sx={{ 
                maxHeight: '300px', 
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255, 215, 0, 0.5)',
                  borderRadius: '3px',
                  '&:hover': {
                    background: 'rgba(255, 215, 0, 0.7)',
                  },
                },
              }}>
                {comments.map((comment, index) => (
                  <React.Fragment key={comment.id}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{ py: 1.5 }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={() => handleCommentLike(comment.id)}
                          size="small"
                        >
                          <Badge 
                            badgeContent={comment.likes} 
                            sx={{
                              '& .MuiBadge-badge': {
                                backgroundColor: '#FFD700',
                                color: 'black',
                                fontSize: '0.7rem',
                                height: '16px',
                                minWidth: '16px',
                              }
                            }}
                          >
                            <ThumbUpIcon fontSize="small" />
                          </Badge>
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          bgcolor: '#FFD700', 
                          color: 'black',
                          width: 32,
                          height: 32,
                          fontSize: '0.9rem',
                        }}>
                          {comment.name[0].toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography sx={{ 
                            color: '#FFD700', 
                            fontWeight: 500,
                            fontSize: '0.9rem',
                          }}>
                            {comment.name}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography 
                              sx={{ 
                                color: 'rgba(255, 255, 255, 0.9)',
                                my: 0.5,
                                lineHeight: 1.4,
                                fontSize: '0.85rem',
                              }}
                            >
                              {comment.text}
                            </Typography>
                            <Typography 
                              sx={{ 
                                color: 'rgba(255, 255, 255, 0.5)', 
                                fontSize: '0.75rem' 
                              }}
                            >
                              {new Date(comment.timestamp).toLocaleString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < comments.length - 1 && (
                      <Divider
                        variant="inset"
                        component="li"
                        sx={{ borderColor: 'rgba(255, 215, 0, 0.1)' }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Admin Login Dialog */}
      <Dialog 
        open={adminDialogOpen} 
        onClose={() => setAdminDialogOpen(false)}
        PaperProps={{
          sx: {
            background: 'rgba(0, 0, 0, 0.95)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            p: 1,
          }
        }}
      >
        <DialogTitle sx={{ color: '#FFD700' }}>Admin Access</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Admin Password"
            type="password"
            fullWidth
            variant="outlined"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button 
            onClick={() => setAdminDialogOpen(false)}
            variant="text"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAdminLogin}
            variant="contained"
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Engagement; 