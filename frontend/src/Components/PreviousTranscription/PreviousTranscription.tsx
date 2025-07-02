import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Collapse,
  Button,
} from '@mui/material';

interface TranscriptionItem {
  id: number;
  title: string;
  segments: string[];
}

const mockData: TranscriptionItem[] = [
  {
    id: 1,
    title: 'Friday Khutbah - The Art of Silence',
    segments: [
      'Welcome to the khutbah.',
      'Today’s topic is silence and reflection.',
      'The Prophet (PBUH) said...',
    ],
  },
  {
    id: 2,
    title: 'Interview with Dr. Smith',
    segments: [
      'Can you introduce yourself?',
      'My name is Dr. Smith and I specialize in AI.',
    ],
  },
];

const PreviousTranscription: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Previous Transcriptions
      </Typography>

      {mockData.map(item => (
        <Card
          key={item.id}
          sx={{
            mb: 2,
            cursor: 'pointer',
            border: expandedId === item.id ? '2px solid #1976d2' : '1px solid #ccc',
          }}
        >
          <CardContent onClick={() => handleToggle(item.id)}>
            <Typography variant="subtitle1" fontWeight="bold">
              {item.title}
            </Typography>
          </CardContent>

          <Collapse in={expandedId === item.id} timeout="auto" unmountOnExit>
            <CardContent>
              {item.segments.map((seg, idx) => (
                <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
                  {seg}
                </Typography>
              ))}
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </Box>
  );
};

export default PreviousTranscription;
