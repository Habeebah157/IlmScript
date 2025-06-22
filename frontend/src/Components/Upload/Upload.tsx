import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  FormControlLabel,
  Switch,
  Tabs,
  Tab
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

      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Upload your Islamic video or audio files for transcription.
      </Typography>


      <Divider sx={{ my: 3 }} />

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="transcription language tabs">
          <Tab label="English" {...a11yProps(0)} />
          <Tab label="Arabic" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        English transcript will appear here.
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Arabic transcript will appear here.
      </CustomTabPanel>
    </Box>
  );
};

export default Upload;
