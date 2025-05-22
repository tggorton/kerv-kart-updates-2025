import React from 'react';
import './App.css';
import ConfigurationPanel from './ConfigurationPanel';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Applies baseline styles and background color from theme */}
      <div className="App">
        <ConfigurationPanel />
      </div>
    </ThemeProvider>
  );
}

export default App;
