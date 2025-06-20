import React from 'react';
import { Box, Typography, Divider, Button, FormControlLabel, Switch } from '@mui/material';
import { IconScript } from '@tabler/icons-react';
import FileUploadDropzone from '../FileUploadDropzone/FileUploadDropzone';
import ProgressBar from '../ProgressBar/ProgressBar'; // Assuming you have a ProgressBar component
import { useState } from 'react';

const Upload: React.FC = () => {
    const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(prev => !prev);
  };
    
  return (
    
    <Box sx={{}}>
    <Box sx={{display: 'flex', justifyContent: 'space-between', m: 0}}>
    <Typography variant="body1">Transcription</Typography>
        <FormControlLabel
        control={
          <Switch
            checked={isOn}
            onChange={handleToggle}
            color="primary"
          />
        }
        label={isOn ? 'Arabic Underneth' : 'Off'}
      />
    </Box>
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <ProgressBar /> {/* Include the ProgressBar component here */}
        <Typography variant="body1">Download Transcript</Typography>
    </Box>
      
      <Typography variant='subtitle1'>Upload your Islamic video or audio files for transcription.</Typography>

      

      <Divider sx={{ my: 2 }} /> 
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <IconScript size={24} style={{ marginRight: 8, color: '#1976d2' }} />
        <Typography variant='body1' sx={{ flexGrow: 1 }}>
Hello, please work        </Typography>
        <Button variant="outlined">
          Completed
        </Button>
      </Box>
    </Box>
  );
}

export default Upload;