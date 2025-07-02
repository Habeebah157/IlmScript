import React from "react";
import { Box, Typography, Container, Divider } from "@mui/material";
import PreviousTranscription from "../PreviousTranscription/PreviousTranscription";

const Home: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" fontFamily="Arial">
          Home
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome! Browse your recent transcriptions below.
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <PreviousTranscription />
    </Container>
  );
};

export default Home;
