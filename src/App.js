import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Forms from './pages/Forms';
import Tables from './pages/Tables';
import DragDrop from './pages/DragDrop';
import FileHandling from './pages/FileHandling';
import ApiTests from './pages/ApiTests';
import IframeTest from './pages/IframeTest';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navigation />
          <main className="App-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/drag-drop" element={<DragDrop />} />
              <Route path="/file-handling" element={<FileHandling />} />
              <Route path="/api-tests" element={<ApiTests />} />
              <Route path="/iframe-test" element={<IframeTest />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
