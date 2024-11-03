import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { generateEvent } from '../../services/openai';
import { saveToFile } from '../../services/fileManager';

export default function EventGenerator() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<any>(null);
  const [rawResponse, setRawResponse] = useState<string>('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateEvent(prompt);
      setEvent(result);
      setRawResponse(JSON.stringify(result, null, 2));
      await saveToFile('events', result.name, result);
    } catch (error) {
      console.error('Failed to generate event:', error);
      setRawResponse(JSON.stringify(error, null, 2));
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h2" gutterBottom>
        Event Generator
      </Typography>
      
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        label="Describe your event"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        onClick={handleGenerate}
        disabled={loading || !prompt}
        sx={{ mb: 4 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Generate Event'}
      </Button>

      {event && (
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h4" gutterBottom>{event.name}</Typography>
          <Typography><strong>Type:</strong> {event.type}</Typography>
          <Typography><strong>Scale:</strong> {event.scale}</Typography>
          
          <Typography variant="h6" sx={{ mt: 3 }}>Description</Typography>
          <Typography>{event.description}</Typography>

          <Typography variant="h6" sx={{ mt: 3 }}>Causes</Typography>
          <List dense>
            {event.causes?.map((cause: string, index: number) => (
              <ListItem key={index}>
                <ListItemText primary={cause} />
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" sx={{ mt: 3 }}>Consequences</Typography>
          <Typography><strong>Immediate:</strong></Typography>
          <List dense>
            {event.consequences?.immediate?.map((consequence: string, index: number) => (
              <ListItem key={index}>
                <ListItemText primary={consequence} />
              </ListItem>
            ))}
          </List>
          <Typography><strong>Long Term:</strong></Typography>
          <List dense>
            {event.consequences?.longTerm?.map((consequence: string, index: number) => (
              <ListItem key={index}>
                <ListItemText primary={consequence} />
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" sx={{ mt: 3 }}>Involved Parties</Typography>
          <Typography><strong>Main Actors:</strong></Typography>
          <List dense>
            {event.involvedParties?.mainActors?.map((actor: string, index: number) => (
              <ListItem key={index}>
                <ListItemText primary={actor} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {rawResponse && (
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Debug: Raw Response</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper sx={{ p: 2, backgroundColor: 'grey.900' }}>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                {rawResponse}
              </pre>
            </Paper>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}