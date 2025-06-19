import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

function App() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const sendMessage = async () => {
    try {
      // Clear previous errors
      setError('');
      
      // Send POST request with proper JSON structure
      const result = await axios.post('http://localhost:8000/send', 
        { text: inputText },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      setResponse(result.data.response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || 'Unknown error occurred');
      } else {
        setError('An unexpected error occurred');
      }
      console.error('API Error:', err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 3,
        p: 3,
        boxShadow: 3,
        borderRadius: 2
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          FastAPI + React Demo
        </Typography>
        
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          sx={{ py: 1.5 }}
        >
          Send to Backend
        </Button>
        
        {response && (
          <Box sx={{ 
            p: 2, 
            bgcolor: 'success.light', 
            borderRadius: 1 
          }}>
            <Typography>Backend response: {response}</Typography>
          </Box>
        )}
        
        {error && (
          <Box sx={{ 
            p: 2, 
            bgcolor: 'error.light', 
            borderRadius: 1 
          }}>
            <Typography color="error">Error: {error}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;