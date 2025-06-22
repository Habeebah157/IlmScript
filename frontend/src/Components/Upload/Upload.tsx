import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  FormControlLabel,
  Switch,
  Tabs,
  Tab, 
  Button,
} from '@mui/material';
import ProgressBar from '../ProgressBar/ProgressBar'; // Ensure this exists

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Upload: React.FC = () => {
  const [isOn, setIsOn] = useState(false);
  const [value, setValue] = useState(0); // for Tabs
  const [transcription, setTranscription] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);


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

  const handleToggle = () => {
    setIsOn(prev => !prev);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      {/* Top row with Transcription label and toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1">Transcription</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={isOn}
              onChange={handleToggle}
              color="primary"
            />
          }
          label={isOn ? 'Arabic Underneath' : 'Off'}
        />
      </Box>

      {/* ProgressBar and Download label */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <ProgressBar />
        <Typography variant="body2">Download Transcript</Typography>
      </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 4 }}>
      

      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Upload your Islamic video or audio files for transcription.
      </Typography>

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

        
        </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="transcription language tabs">
          <Tab label="English" {...a11yProps(0)} />
          <Tab label="Arabic" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {transcription && (
            <p>{transcription}</p>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Arabic transcript will appear here.
      </CustomTabPanel>
    </Box>
  );
};

export default Upload;
