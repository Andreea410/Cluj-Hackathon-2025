import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../services/api';

export const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Validate required fields
      if (!formData.email || !formData.password || !formData.first_name || !formData.last_name) {
        throw new Error('All fields are required');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Invalid email format');
      }

      // Validate password strength
      if (formData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Send registration request
      const response = await userApi.register(formData);
      
      // Store the token if it's returned
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }

      // Redirect to skin analysis
      navigate('/skin-analysis');
    } catch (err: any) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.details || err.message || 'Registration failed';
      setError(errorMessage);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        Create Account
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            required
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            fullWidth
            error={!!error && !formData.first_name}
            helperText={!formData.first_name ? 'First name is required' : ''}
          />

          <TextField
            required
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            fullWidth
            error={!!error && !formData.last_name}
            helperText={!formData.last_name ? 'Last name is required' : ''}
          />

          <TextField
            required
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            error={!!error && (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))}
            helperText={
              !formData.email 
                ? 'Email is required' 
                : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                ? 'Invalid email format'
                : ''
            }
          />

          <TextField
            required
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            error={!!error && (!formData.password || formData.password.length < 8)}
            helperText={
              !formData.password 
                ? 'Password is required' 
                : formData.password.length < 8
                ? 'Password must be at least 8 characters long'
                : ''
            }
          />

          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create Account
          </Button>
        </Box>
      </form>
    </Paper>
  );
}; 