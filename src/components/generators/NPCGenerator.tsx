import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { generateNPC } from '../../services/openai';
import { saveToFile } from '../../services/fileManager';

export default function NPCGenerator() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [npc, setNPC] = useState<any>(null);
  const [rawResponse, setRawResponse] = useState<string>('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateNPC(prompt);
      setNPC(result);
      setRawResponse(JSON.stringify(result, null, 2));
      await saveToFile('npcs', result.name, result);
    } catch (error) {
      console.error('Failed to generate NPC:', error);
      setRawResponse(JSON.stringify(error, null, 2));
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h2" gutterBottom>
        NPC Generator
      </Typography>
      
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        label="Describe your NPC"
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
        {loading ? <CircularProgress size={24} /> : 'Generate NPC'}
      </Button>

      {npc && (
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h4" gutterBottom>{npc.name}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography><strong>Race:</strong> {npc.race}</Typography>
              <Typography><strong>Class:</strong> {npc.class}</Typography>
              <Typography><strong>Background:</strong> {npc.background}</Typography>
              <Typography><strong>Alignment:</strong> {npc.alignment}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Abilities:</strong></Typography>
              <Typography>STR: {npc.abilities?.strength}</Typography>
              <Typography>DEX: {npc.abilities?.dexterity}</Typography>
              <Typography>CON: {npc.abilities?.constitution}</Typography>
              <Typography>INT: {npc.abilities?.intelligence}</Typography>
              <Typography>WIS: {npc.abilities?.wisdom}</Typography>
              <Typography>CHA: {npc.abilities?.charisma}</Typography>
            </Grid>
          </Grid>
          <Typography sx={{ mt: 2 }}><strong>Description:</strong></Typography>
          <Typography>{npc.description}</Typography>
          <Typography sx={{ mt: 2 }}><strong>Personality:</strong></Typography>
          <Typography>{npc.personality}</Typography>
          <Typography sx={{ mt: 2 }}><strong>Motivation:</strong></Typography>
          <Typography>{npc.motivation}</Typography>
          <Typography sx={{ mt: 2 }}><strong>Connections:</strong></Typography>
          <Typography><strong>Allies:</strong> {npc.connections?.allies?.join(', ')}</Typography>
          <Typography><strong>Enemies:</strong> {npc.connections?.enemies?.join(', ')}</Typography>
          <Typography><strong>Organizations:</strong> {npc.connections?.organizations?.join(', ')}</Typography>
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