import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServerSidebar from "./components/ServerSidebar";
import Home from './pages/Home';
import Chats from './pages/Chats';
import Documents from './pages/Documents';
import Settings from './pages/Settings';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#141414',
      paper: '#1e1e1e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box 
          component="div" 
          sx={{ 
            display: 'flex', 
            minHeight: '100vh',
            width: '100%',
            bgcolor: 'background.default',
            color: 'text.primary',
          }}
        >
          <ServerSidebar />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1,
              ml: '72px', // Match sidebar width
              bgcolor: 'background.default',
              minHeight: '100vh',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
