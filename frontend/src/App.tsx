import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendToBackend = async () => {
    try {
      const res = await axios.post("http://localhost:8000/send", {
        text: message,
      });
      setResponse(res.data.response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h4">React + FastAPI + MUI</Typography>
        
        <TextField
          label="Type a message"
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ mt: 3 }}
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={sendToBackend}
          sx={{ mt: 2 }}
        >
          Send to FastAPI
        </Button>
        
        {response && (
          <Typography sx={{ mt: 2 }} color="text.secondary">
            {response}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default App;