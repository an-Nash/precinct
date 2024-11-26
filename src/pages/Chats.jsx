import { Box, Typography, IconButton, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from 'react';

export default function Chats() {
  const [message, setMessage] = useState('');
  const [chatHistory] = useState([
    { id: 1, title: 'Previous Chat 1', date: '2024-01-20' },
    { id: 2, title: 'How to implement React Router', date: '2024-01-19' },
    { id: 3, title: 'Debugging TypeScript Errors', date: '2024-01-18' },
  ]);

  const [messages] = useState([
    { id: 1, role: 'user', content: 'How do I create a React component?' },
    { id: 2, role: 'assistant', content: 'To create a React component, you can use either a function or class syntax. Here\'s an example of a functional component:\n\n```jsx\nfunction MyComponent() {\n  return (\n    <div>\n      <h1>Hello World</h1>\n    </div>\n  );\n}\n```' },
  ]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Chat History Sidebar */}
      <Box
        sx={{
          width: '260px',
          backgroundColor: '#0f0f0f',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* New Chat Button */}
        <Button
          startIcon={<AddIcon />}
          sx={{
            color: '#e0e0e0',
            m: 2,
            p: 1,
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            justifyContent: 'flex-start',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderColor: 'rgba(255,255,255,0.2)',
            }
          }}
        >
          New Chat
        </Button>

        {/* Chat History List */}
        <Box sx={{ overflow: 'auto', flex: 1 }}>
          {chatHistory.map((chat) => (
            <Box
              key={chat.id}
              sx={{
                p: 2,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#e0e0e0',
              }}
            >
              <Typography noWrap sx={{ flex: 1 }}>
                {chat.title}
              </Typography>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'rgba(255,255,255,0.3)',
                  '&:hover': {
                    color: 'rgba(255,255,255,0.8)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                  }
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Main Chat Area */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: '#1a1a1a',
      }}>
        {/* Messages Container */}
        <Box sx={{ 
          flex: 1, 
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                p: 4,
                backgroundColor: msg.role === 'assistant' ? '#252525' : 'transparent',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <Typography
                sx={{
                  whiteSpace: 'pre-wrap',
                  fontFamily: msg.role === 'assistant' ? 'monospace' : 'inherit',
                  color: '#e0e0e0',
                  lineHeight: 1.6,
                }}
              >
                {msg.content}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Message Input */}
        <Box sx={{ 
          p: 2, 
          borderTop: '1px solid rgba(255,255,255,0.05)',
          backgroundColor: '#1a1a1a',
        }}>
          <Box sx={{ 
            maxWidth: '800px', 
            margin: '0 auto',
            position: 'relative',
          }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send a message..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#252525',
                  borderRadius: '8px',
                  color: '#e0e0e0',
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(255,255,255,0.3)',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255,255,255,0.3)',
                },
              }}
            />
            <IconButton
              sx={{
                position: 'absolute',
                right: 8,
                bottom: 8,
                color: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  color: 'rgba(255,255,255,0.8)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
