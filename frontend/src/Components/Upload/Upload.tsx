import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const ITEMS_PER_PAGE = 3;

const Upload: React.FC = () => {
  const [transcription, setTranscription] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const handleUpload = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/transcription', {
        method: 'GET',
      });
      const result = await response.json();
      setTranscription(result);
      setPage(0); // reset page on new data
    } catch (err) {
      console.error('Upload failed:', err);
      setTranscription([]);
    } finally {
      setLoading(false);
    }
  };

  const pageCount = Math.ceil(transcription.length / ITEMS_PER_PAGE);
  const currentItems = transcription.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 0));
  const handleNext = () => setPage((p) => Math.min(p + 1, pageCount - 1));

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? 'Loading...' : 'Load Transcription'}
      </Button>

      {currentItems.length === 0 && !loading && (
        <Typography>No transcription loaded yet.</Typography>
      )}

      {currentItems.map((item, i) => (
        <Box
          key={i}
          sx={{
            mb: 2,
            p: 2,
            border: '1px solid #ccc',
            borderRadius: 1,
            backgroundColor: '#fafafa',
          }}
        >
          <Typography variant="body2" color="textSecondary">
            <strong>Start:</strong> {item.start} &nbsp;|&nbsp; <strong>End:</strong> {item.end}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {item.text}
          </Typography>
        </Box>
      ))}

      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handlePrev} disabled={page === 0}>
            Previous
          </Button>
          <Typography sx={{ alignSelf: 'center' }}>
            Page {page + 1} of {pageCount}
          </Typography>
          <Button onClick={handleNext} disabled={page === pageCount - 1}>
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Upload;
