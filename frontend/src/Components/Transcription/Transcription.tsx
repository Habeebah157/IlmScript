import React from 'react'
import { Box, Typography, Divider, Paper } from '@mui/material';
import { IconScript } from '@tabler/icons-react';
import FileUploadDropzone from '../FileUploadDropzone/FileUploadDropzone';
import Button from '@mui/material/Button';


const Transcription: React.FC = () => {
  return (
    
    <Box sx={{ marginLeft: 3 }}>  {/* Adjust marginLeft as you want */}
      <Typography variant='h5'>Upload</Typography>
      <Typography variant='subtitle1'>Upload your Islamic video or audio files for transcription.</Typography>
      <FileUploadDropzone />
      <Typography variant='h6'>Drag and drop your files here or browse.</Typography>
      <Typography variant='h6'>Recent Uploads</Typography>
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
          No recent uploads.
        </Typography>
        <Button variant="outlined">
        Completed
        </Button>


      </Box>

      

    </Box>
  )
}

export default Transcription
