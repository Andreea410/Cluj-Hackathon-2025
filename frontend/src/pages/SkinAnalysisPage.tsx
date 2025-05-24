import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { SkinAnalysisChat } from '../components/SkinAnalysisChat';

export const SkinAnalysisPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Skin Analysis
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
          Let's get to know your skin better. I'll ask you a few questions to create your personalized skincare routine.
        </Typography>
        
        <Paper 
          elevation={3} 
          sx={{ 
            mt: 4,
            p: 3,
            backgroundColor: '#ffffff',
            borderRadius: 2
          }}
        >
          <SkinAnalysisChat />
        </Paper>
      </Box>
    </Container>
  );
}; 