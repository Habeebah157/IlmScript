import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  InputBase,
  Avatar,
  alpha
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: '#fff', 
        color: '#000', 
        boxShadow: 0,
        margin: 0,
    justifyContent: 'center',  // centers children horizontally
    alignItems: 'center',      // centers children vertically (usually default)
    display: 'flex', 
      }}
    >
      <Toolbar 
        sx={{ 
          margin: 0,
        }}
      >
        <Box sx={{ display: 'flex'}}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            MyApp
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Features</Button>
          <Button color="inherit">Pricing</Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Search Box */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: 2,
              bgcolor: alpha('#000', 0.05),
              '&:hover': { bgcolor: alpha('#000', 0.1) },
              width: '250px',
              pl: 2,
              pr: 1,
              py: 0.5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <SearchIcon sx={{ mr: 1, color: 'gray' }} />
            <InputBase placeholder="Search content or transcripts..." fullWidth />
          </Box>
          <Avatar alt="User" src="/avatar.jpg" sx={{ width: 32, height: 32 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;