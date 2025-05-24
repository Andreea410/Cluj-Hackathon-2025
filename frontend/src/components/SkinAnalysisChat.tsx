import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';
import { skinAnalysisApi } from '../services/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const SkinAnalysisChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startAnalysis();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startAnalysis = async () => {
    try {
      setIsLoading(true);
      const response = await skinAnalysisApi.startAnalysis();
      setMessages([
        {
          role: 'assistant',
          content: response.data.message.content
        }
      ]);
    } catch (error) {
      console.error('Error starting analysis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      setIsLoading(true);
      const response = await skinAnalysisApi.submitResponse(userMessage);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: response.data.message.content }
      ]);
    } catch (error) {
      console.error('Error submitting response:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          mb: 2,
          p: 2,
          overflow: 'auto',
          backgroundColor: '#f5f5f5'
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 2,
                maxWidth: '70%',
                backgroundColor:
                  message.role === 'user' ? '#e3f2fd' : '#ffffff'
              }}
            >
              <Typography>{message.content}</Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Paper>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          gap: 1
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading || !input.trim()}
          sx={{ minWidth: 100 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Send'}
        </Button>
      </Box>
    </Box>
  );
}; 