import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";

interface Segment {
  start: number;
  end: number;
  text: string;
}

interface Transcription {
  filename: string;
  url: string;
  segments: Segment[];
}

const PreviousTranscription: React.FC = () => {
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [selectedTranscription, setSelectedTranscription] = useState<Transcription | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranscriptions = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/getsavedtranscriptions");
        if (!response.ok) {
          throw new Error("Failed to fetch transcriptions");
        }
        const data = await response.json();
        setTranscriptions(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTranscriptions();
  }, []);

  const handleOpenModal = (transcription: Transcription) => {
    setSelectedTranscription(transcription);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Your Previous Transcriptions
      </Typography>

      {transcriptions.length === 0 ? (
        <Typography>No transcriptions found</Typography>
      ) : (
        <List>
          {transcriptions.map((transcription, index) => (
            <ListItem
              key={index}
              sx={{
                mb: 2,
                border: "1px solid #eee",
                borderRadius: 1,
                "&:hover": {
                  boxShadow: 1,
                  borderColor: "primary.main",
                },
              }}
            >
              <ListItemText
                primary={transcription.filename}
                secondary={`${transcription.segments.length} segments`}
              />
              <Button
                variant="contained"
                onClick={() => handleOpenModal(transcription)}
                sx={{ ml: 2 }}
              >
                View Details
              </Button>
            </ListItem>
          ))}
        </List>
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="transcription-modal"
        aria-describedby="transcription-details"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "80%" },
            maxWidth: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            maxHeight: "80vh",
            overflowY: "auto",
            borderRadius: 1,
          }}
        >
          {selectedTranscription && (
            <>
              <Typography variant="h5" gutterBottom>
                {selectedTranscription.filename}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Audio URL:{" "}
                <a
                  href={selectedTranscription.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedTranscription.url}
                </a>
              </Typography>

              {/* 🎧 Audio Player */}
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Audio Preview:
              </Typography>
              <Box sx={{ mb: 3 }}>
                <audio
                  controls
                  style={{ width: "100%" }}
                  src={selectedTranscription.url}
                >
                  Your browser does not support the audio element.
                </audio>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Transcription Segments
              </Typography>

              <List sx={{ mt: 2 }}>
                {selectedTranscription.segments.map((segment, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      mb: 2,
                      "&:hover": {
                        boxShadow: 1,
                      },
                    }}
                  >
                    <Typography variant="subtitle2" color="primary">
                      {segment.start.toFixed(2)}s - {segment.end.toFixed(2)}s
                    </Typography>
                    <Typography sx={{ mt: 1 }}>{segment.text}</Typography>
                  </Paper>
                ))}
              </List>

              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button variant="outlined" onClick={handleCloseModal} sx={{ mt: 2 }}>
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default PreviousTranscription;
