import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Alert,
  FormHelperText
} from '@mui/material';

const Forms = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    newsletter: false,
    country: '',
    interests: []
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }

    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setErrors({});
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          username: '',
          email: '',
          password: '',
          gender: '',
          newsletter: false,
          country: '',
          interests: []
        });
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }} data-cy="forms-container">
      <Typography variant="h4" component="h1" gutterBottom data-cy="forms-title">
        Form Testing
      </Typography>

      {submitted && (
        <Alert severity="success" data-cy="success-message" sx={{ mb: 2 }}>
          Form submitted successfully!
        </Alert>
      )}

      <form onSubmit={handleSubmit} data-cy="test-form">
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          margin="normal"
          data-cy="username-input"
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
          data-cy="email-input"
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          margin="normal"
          data-cy="password-input"
        />

        <FormControl 
          component="fieldset" 
          margin="normal" 
          error={!!errors.gender}
          fullWidth
        >
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            data-cy="gender-group"
          >
            <FormControlLabel 
              value="female" 
              control={<Radio />} 
              label="Female"
              data-cy="gender-female" 
            />
            <FormControlLabel 
              value="male" 
              control={<Radio />} 
              label="Male"
              data-cy="gender-male" 
            />
            <FormControlLabel 
              value="other" 
              control={<Radio />} 
              label="Other"
              data-cy="gender-other" 
            />
          </RadioGroup>
          {errors.gender && (
            <FormHelperText>{errors.gender}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.country}>
          <InputLabel>Country</InputLabel>
          <Select
            name="country"
            value={formData.country}
            onChange={handleChange}
            label="Country"
            data-cy="country-select"
          >
            <MenuItem value="" data-cy="country-none">
              <em>None</em>
            </MenuItem>
            <MenuItem value="us" data-cy="country-us">United States</MenuItem>
            <MenuItem value="uk" data-cy="country-uk">United Kingdom</MenuItem>
            <MenuItem value="ca" data-cy="country-ca">Canada</MenuItem>
          </Select>
          {errors.country && (
            <FormHelperText>{errors.country}</FormHelperText>
          )}
        </FormControl>

        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                data-cy="newsletter-checkbox"
              />
            }
            label="Subscribe to newsletter"
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          data-cy="submit-button"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Forms; 