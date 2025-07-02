import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  InputBase,
  Avatar,
  alpha,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: '#fff',
        color: '#000',
        boxShadow: 'none',
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <Toolbar
        sx={{
          minHeight: 24,
          paddingTop: 0,
          paddingBottom: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 0,
          pb: 0,
          px: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
            IlmScript
          </Typography>

          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{
              padding: '1px 4px',
              fontSize: '0.75rem',
              minWidth: 'auto',
              textTransform: 'none',
              color: '#000',
              minHeight: 'auto',
            }}
          >
            Home
          </Button>

          <Button
            component={Link}
            to="/transcription"
            color="inherit"
            sx={{
              padding: '1px 4px',
              fontSize: '0.75rem',
              minWidth: 'auto',
              textTransform: 'none',
              color: '#000',
              minHeight: 'auto',
            }}
          >
            Transcription
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box
            sx={{
              position: 'relative',
              borderRadius: 1.5,
              bgcolor: alpha('#000', 0.05),
              '&:hover': { bgcolor: alpha('#000', 0.1) },
              width: 200,
              height: 20,
              pl: 1,
              pr: 0.5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <SearchIcon sx={{ color: 'gray', mr: 0.5, fontSize: '1rem' }} />
            <InputBase
              placeholder="Search content or transcripts..."
              fullWidth
              sx={{
                fontSize: '0.75rem',
                height: '100%',
                '& input': {
                  padding: '0 0',
                  height: '100%',
                  boxSizing: 'border-box',
                },
              }}
            />
          </Box>

          <Avatar alt="User" src="/avatar.jpg" sx={{ width: 20, height: 20 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
