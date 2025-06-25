import React, { useState } from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Navbar from './Components/Navbar/Navbar';
import { Box, Button, Typography } from '@mui/material';
import Transcription from './Components/Transcription/Transcription';
import  Upload from './Components/Upload/Upload';

const App: React.FC = () => {
  

  return (
    <>
      <Navbar />
      <Sidebar />

        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, justifyContent: 'space-between', width: '100%' }}>
          <Transcription />
          <Upload />
  
        
       
      </Box>
    </>
  );
};

export default App;
