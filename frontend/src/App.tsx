import React, { useState } from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Navbar from './Components/Navbar/Navbar';
import { Box, Button, Typography } from '@mui/material';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    // const formData = new FormData();
    // formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/transcribe', {
        method: 'POST',
        // body: formData,
      });

      const result = await response.json();
      console.log(result)
      setTranscription(result.text);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Upload MP3 for Transcription
        </Typography>

        <input type="file" accept="audio/mp3" onChange={handleFileChange} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          sx={{ mt: 2, width: 'fit-content' }}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload and Transcribe'}
        </Button>

        {transcription && (
          <Box mt={4}>
            <Typography variant="h6">Transcription Result:</Typography>
            <pre>{transcription}</pre>
          </Box>
        )}
      </Box>
    </>
  );
};

export default App;
