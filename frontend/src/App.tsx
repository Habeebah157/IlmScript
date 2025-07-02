import React, { useState } from 'react';
// import Sidebar from './Components/Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import { Box, Button, Typography } from '@mui/material';
import Transcription from './Components/Transcription/Transcription';
import  Upload from './Components/Upload/Upload';
import Home from './Components/Home/Home'; // 👈 create this file next


const App: React.FC = () => {
  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/transcription"
          element={
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, justifyContent: 'space-between', width: '100%' }}>
              <Transcription />
              <Upload />
            </Box>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
