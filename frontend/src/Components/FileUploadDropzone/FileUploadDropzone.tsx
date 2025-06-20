import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUploadDropzone: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    // Handle the uploaded files here
    console.log('Files uploaded:', files);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper
        elevation={0}
        sx={{
          border: '2px dashed #e0e0e0',
          borderColor: isDragOver ? '#1976d2' : '#e0e0e0',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          backgroundColor: isDragOver ? '#f5f5f5' : 'transparent',
          '&:hover': {
            borderColor: '#bdbdbd',
            backgroundColor: '#fafafa',
          },
          position: 'relative',
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        {/* Upload Icon */}
        <CloudUploadIcon 
          sx={{ 
            fontSize: 48, 
            color: '#9e9e9e',
            mb: 1
          }} 
        />
        
        {/* Main Text */}
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#757575',
            fontWeight: 400,
            mb: 1
          }}
        >
          Drag and drop your files here
        </Typography>
        
        {/* Or Divider */}
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#9e9e9e',
            mb: 1
          }}
        >
          or
        </Typography>
        
        {/* Browse Button */}
        <Button
          variant="outlined"
          sx={{
            textTransform: 'none',
            borderColor: '#e0e0e0',
            color: '#424242',
            '&:hover': {
              borderColor: '#bdbdbd',
              backgroundColor: '#f5f5f5',
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleBrowseClick();
          }}
        >
          Browse Files
        </Button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          accept="*/*"
        />

        {/* Corner resize handles (decorative) */}
        <Box
          sx={{
            position: 'absolute',
            top: -4,
            left: -4,
            width: 8,
            height: 8,
            backgroundColor: '#1976d2',
            borderRadius: '50%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: -4,
            right: -4,
            width: 8,
            height: 8,
            backgroundColor: '#1976d2',
            borderRadius: '50%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -4,
            left: -4,
            width: 8,
            height: 8,
            backgroundColor: '#1976d2',
            borderRadius: '50%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -4,
            right: -4,
            width: 8,
            height: 8,
            backgroundColor: '#1976d2',
            borderRadius: '50%',
          }}
        />
      </Paper>
    </Box>
  );
};

export default FileUploadDropzone;