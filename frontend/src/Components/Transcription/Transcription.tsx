import React, { useState } from 'react';
import { Box, Typography, Divider, Paper, Button } from '@mui/material';
import { IconScript } from '@tabler/icons-react';
import FileUploadDropzone from '../FileUploadDropzone/FileUploadDropzone';

const Transcription: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an MP3 file first.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setAudioUrl(`http://127.0.0.1:8000${data.url}`);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ marginLeft: 3 }}>
      <Typography variant='h5'>Upload</Typography>
      <Typography variant='subtitle1'>
        Upload your Islamic video or audio files for transcription.
      </Typography>

      <FileUploadDropzone />

      <Typography variant='h6'>Drag and drop your files here or browse.</Typography>
      <Typography variant='h6'>Recent Uploads</Typography>

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
          alignItems: 'center',
        }}
      >
        <IconScript size={24} style={{ marginRight: 8, color: '#1976d2' }} />
        <Typography variant='body1' sx={{ flexGrow: 1 }}>
          No recent uploads.
        </Typography>
        <Button variant="outlined">Completed</Button>
      </Box>

      {/* Upload + Playback UI */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Upload MP3</Typography>
        <input type="file" accept=".mp3" onChange={handleFileChange} />
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={uploading}
          sx={{ ml: 2 }}
        >
          {uploading ? "Uploading..." : "Upload & Play"}
        </Button>

        {audioUrl && (
  <Box
    sx={{
      mt: 4,
      p: 3,
      borderRadius: 3,
      bgcolor: '#f5f5f5',
      boxShadow: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 1,
      maxWidth: 500,
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
      Playback
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Your uploaded audio is ready. You can listen below:
    </Typography>
    <audio
      controls
      src={audioUrl}
      style={{
        width: '100%',
        borderRadius: 8,
        outline: 'none',
      }}
    />
  </Box>
)}

      </Box>
    </Box>
  );
};

export default Transcription;
