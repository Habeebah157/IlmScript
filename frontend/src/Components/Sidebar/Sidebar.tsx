import React, { useState } from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 250;
const peekWidth = 40; // width of the peek-out strip

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleDrawerClose = (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {!open && (
        <Box
          role="button"
          tabIndex={0}
          aria-label="Open sidebar"
          sx={{
            position: 'fixed',
            top: 64, // adjust for your navbar height
            left: 0,
            width: peekWidth,
            height: '100vh',
            bgcolor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1300,
            color: 'black',
            border: '1px solid black',
            borderRadius: '4px',
            padding: '2px',
          }}
          onClick={toggleDrawer}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
                toggleDrawer();
            }
            }}

        >
          <MenuIcon
            sx={{
              color: 'black',
              border: '1px solid black',
              borderRadius: '4px',
              padding: '2px',
              cursor: 'pointer',
            }}
          />
        </Box>
      )}

      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
             width: drawerWidth,
                height: 700,        // <--- Set height here
                top: 64,            // Adjust this to position drawer below navbar if needed
                overflowY: 'auto',  // Enable scroll if content overflows
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
          },
        }}
      >
        <Box
          sx={{ width: drawerWidth, height: 100 }}
          role="presentation"
          onKeyDown={handleDrawerClose}
        >
          <List>
            {['Home', 'Features', 'Pricing'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
