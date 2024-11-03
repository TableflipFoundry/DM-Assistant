import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { generateLocation } from '../../services/openai';
import { saveToFile } from '../../services/fileManager';

export default function LocationGenerator() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const [rawResponse, setRawResponse] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateLocation(prompt);
      setLocation(result);
      setRawResponse(JSON.stringify(result, null, 2));
      await saveToFile('locations', result.name, result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate location');
      console.error('Failed to generate location:', err);
      setRawResponse(JSON.stringify(err, null, 2));
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h2" gutterBottom>
        Location Generator
      </Typography>
      
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        label="Describe your location"
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
        {loading ? <CircularProgress size={24} /> : 'Generate Location'}
      </Button>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {location && (
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h4" gutterBottom>{location.name}</Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Overview</Typography>
              <Typography><strong>Type:</strong> {location.type}</Typography>
              <Typography><strong>Population:</strong> {location.population}</Typography>
              <Typography sx={{ mt: 2 }}><strong>Description:</strong></Typography>
              <Typography>{location.description}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Government</Typography>
              <Typography><strong>Type:</strong> {location.government?.type}</Typography>
              <Typography><strong>Leaders:</strong></Typography>
              <List dense>
                {location.government?.leaders?.map((leader: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={leader} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Economy</Typography>
              <Typography><strong>Wealth Level:</strong> {location.economy?.wealth}</Typography>
              <Typography><strong>Main Resources:</strong></Typography>
              <List dense>
                {location.economy?.resources?.map((resource: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={resource} />
                  </ListItem>
                ))}
              </List>
              <Typography><strong>Trade:</strong></Typography>
              <List dense>
                {location.economy?.trades?.map((trade: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={trade} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Defenses</Typography>
              {location.defenses?.walls && (
                <Typography><strong>Walls:</strong> {location.defenses.walls}</Typography>
              )}
              <Typography><strong>Guards:</strong> {location.defenses?.guards}</Typography>
              {location.defenses?.specialDefenses && (
                <>
                  <Typography><strong>Special Defenses:</strong></Typography>
                  <List dense>
                    {location.defenses.specialDefenses.map((defense: string, index: number) => (
                      <ListItem key={index}>
                        <ListItemText primary={defense} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Points of Interest</Typography>
              <List>
                {location.pointsOfInterest?.map((poi: any, index: number) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={poi.name}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {poi.type}
                          </Typography>
                          {" — "}{poi.description}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
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