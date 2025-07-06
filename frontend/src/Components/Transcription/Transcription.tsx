import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Button,
  CircularProgress,
  Paper,
  Grid,
} from '@mui/material';

type Segment = {
  start: number;
  end: number;
  text: string;
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const SEGMENTS_PER_PAGE = 5;

const Transcription: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [page, setPage] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select an MP3 file first.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setAudioUrl(data.url);
      setSegments(data.segments || []);
      setPage(0); // Reset to first page
    } catch (error: any) {
      alert(error.message || 'An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  const startIdx = page * SEGMENTS_PER_PAGE;
  const paginatedSegments = segments.slice(startIdx, startIdx + SEGMENTS_PER_PAGE);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, px: 4, mt: 4 }}>
      {/* Upload Section */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">Upload MP3</Typography>
        <input
          type="file"
          accept=".mp3"
          onChange={handleFileChange}
          style={{ marginTop: 8 }}
        />
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={uploading}
          sx={{ ml: 2 }}
        >
          {uploading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Uploading...
            </>
          ) : (
            'Upload & Transcribe'
          )}
        </Button>
      </Box>

      {/* Transcription Section */}
      <Box
        sx={{
          flex: 2,
          p: 3,
          borderRadius: 3,
          bgcolor: '#f5f5f5',
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 700,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Playback
        </Typography>

        {audioUrl && (
          <audio
            controls
            autoPlay
            src={audioUrl ?? ''}
            style={{
              width: '100%',
              borderRadius: 8,
              outline: 'none',
            }}
          />
        )}

        {segments.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Transcription Segments
            </Typography>

            <Grid container spacing={2}>
              {paginatedSegments.map((seg, index) => (
                <Grid item xs={12} key={index}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: '#ffffff',
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {formatTime(seg.start)} → {formatTime(seg.end)}
                    </Typography>
                    <Typography variant="body1">{seg.text}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Pagination Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
              >
                Previous
              </Button>
              <Typography variant="body2" sx={{ alignSelf: 'center' }}>
                Page {page + 1} of {Math.ceil(segments.length / SEGMENTS_PER_PAGE)}
              </Typography>
              <Button
                variant="outlined"
                onClick={() =>
                  setPage((p) =>
                    p < Math.ceil(segments.length / SEGMENTS_PER_PAGE) - 1 ? p + 1 : p
                  )
                }
                disabled={
                  page >= Math.ceil(segments.length / SEGMENTS_PER_PAGE) - 1
                }
              >
                Next
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Transcription;
