import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import MainLayout from './components/MainLayout';
import './App.css';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <MainLayout />
      </div>
    </ThemeProvider>
  );
}