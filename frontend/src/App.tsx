import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Navbar from './Components/Navbar/Navbar';
import Transcription from './Components/Transcription/Transcription';
import { Box } from '@mui/material';
import Upload from './Components/Upload/Upload';

const App: React.FC = () => {
  return (
    <>
    <Navbar/>
      <Sidebar />
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', paddingLeft: 2 }}>
        <Transcription />
        <Upload />
      </Box>


    </>
  );
};

export default App;
