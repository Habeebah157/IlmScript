import React, { useState } from 'react';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';

const ProgressBar = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // in percentage

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', p: 2 }}>
      <IconButton onClick={handlePlayPause}>
        {playing ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Slider
        value={progress}
        onChange={(e, newValue) => setProgress(newValue as number)}
        sx={{ mx: 2, flexGrow: 1 }}
      />
      <Typography variant="body2">{progress}%</Typography>
    </Box>
  );
};

export default ProgressBar;
