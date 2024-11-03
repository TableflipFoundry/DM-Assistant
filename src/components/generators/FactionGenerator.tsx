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
import { generateFaction } from '../../services/openai';
import { saveToFile } from '../../services/fileManager';

export default function FactionGenerator() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [faction, setFaction] = useState<any>(null);
  const [rawResponse, setRawResponse] = useState<string>('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateFaction(prompt);
      setFaction(result);
      setRawResponse(JSON.stringify(result, null, 2));
      await saveToFile('factions', result.name, result);
    } catch (error) {
      console.error('Failed to generate faction:', error);
      setRawResponse(JSON.stringify(error, null, 2));
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h2" gutterBottom>
        Faction Generator
      </Typography>
      
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        label="Describe your faction"
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
        {loading ? <CircularProgress size={24} /> : 'Generate Faction'}
      </Button>

      {faction && (
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h4" gutterBottom>{faction.name}</Typography>
          <Typography><strong>Type:</strong> {faction.type}</Typography>
          <Typography><strong>Alignment:</strong> {faction.alignment}</Typography>
          
          <Typography variant="h6" sx={{ mt: 3 }}>Goals</Typography>
          <Typography><strong>Primary:</strong> {faction.goals?.primary}</Typography>
          {faction.goals?.secondary && (
            <>
              <Typography><strong>Secondary Goals:</strong></Typography>
              <List dense>
                {faction.goals.secondary.map((goal: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={goal} />
                  </ListItem>
                ))}
              </List>
            </>
          )}

          <Typography variant="h6" sx={{ mt: 3 }}>Leadership</Typography>
          <Typography><strong>Structure:</strong> {faction.leadership?.structure}</Typography>
          {faction.leadership?.leaders && (
            <List dense>
              {faction.leadership.leaders.map((leader: any, index: number) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={leader.name}
                    secondary={`${leader.role} - ${leader.description}`}
                  />
                </ListItem>
              ))}
            </List>
          )}

          <Typography variant="h6" sx={{ mt: 3 }}>Resources</Typography>
          <Typography><strong>Wealth:</strong> {faction.resources?.wealth}</Typography>
          {faction.resources?.assets && (
            <>
              <Typography><strong>Assets:</strong></Typography>
              <List dense>
                {faction.resources.assets.map((asset: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={asset} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
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