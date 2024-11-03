import React from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import NPCGenerator from './generators/NPCGenerator';
import LocationGenerator from './generators/LocationGenerator';
import FactionGenerator from './generators/FactionGenerator';
import EventGenerator from './generators/EventGenerator';

export default function MainLayout() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        bgcolor: 'background.default',
        borderRadius: 0
      }}
    >
      <Tabs 
        value={value} 
        onChange={handleChange} 
        centered
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Tab label="NPCs" />
        <Tab label="Locations" />
        <Tab label="Factions" />
        <Tab label="Events" />
      </Tabs>

      <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        {value === 0 && <NPCGenerator />}
        {value === 1 && <LocationGenerator />}
        {value === 2 && <FactionGenerator />}
        {value === 3 && <EventGenerator />}
      </Box>
    </Paper>
  );
}