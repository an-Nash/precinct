import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Settings() {
  const [models, setModels] = useState(() => {
    const saved = localStorage.getItem('aiModels');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [openDialog, setOpenDialog] = useState(false);
  const [showApiKey, setShowApiKey] = useState({});
  const [editingModel, setEditingModel] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  
  const [formData, setFormData] = useState({
    name: '',
    apiBase: '',
    apiKey: '',
    modelName: '',
  });

  useEffect(() => {
    localStorage.setItem('aiModels', JSON.stringify(models));
  }, [models]);

  const handleOpenDialog = (model = null) => {
    if (model) {
      setFormData(model);
      setEditingModel(model);
    } else {
      setFormData({ name: '', apiBase: '', apiKey: '', modelName: '' });
      setEditingModel(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ name: '', apiBase: '', apiKey: '', modelName: '' });
    setEditingModel(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.apiBase || !formData.apiKey || !formData.modelName) {
      setNotification({
        open: true,
        message: 'Please fill in all fields',
        severity: 'error'
      });
      return;
    }

    if (editingModel) {
      setModels(models.map(model => 
        model.name === editingModel.name ? formData : model
      ));
      setNotification({
        open: true,
        message: 'Model updated successfully',
        severity: 'success'
      });
    } else {
      if (models.some(model => model.name === formData.name)) {
        setNotification({
          open: true,
          message: 'A model with this name already exists',
          severity: 'error'
        });
        return;
      }
      setModels([...models, formData]);
      setNotification({
        open: true,
        message: 'Model added successfully',
        severity: 'success'
      });
    }
    handleCloseDialog();
  };

  const handleDelete = (name) => {
    setModels(models.filter(model => model.name !== name));
    setNotification({
      open: true,
      message: 'Model deleted successfully',
      severity: 'success'
    });
  };

  const toggleApiKeyVisibility = (name) => {
    setShowApiKey(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <Box 
      sx={{ 
        p: 4, 
        backgroundColor: '#1a1a1a', 
        minHeight: '100vh', 
        color: '#e0e0e0',
        position: 'relative',
        zIndex: 0,
      }}
    >
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            AI Model Settings
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              backgroundColor: '#252525',
              '&:hover': {
                backgroundColor: '#333333',
              }
            }}
          >
            Add New Model
          </Button>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gap: 3, 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          mt: 2
        }}>
          {models.map((model) => (
            <Card 
              key={model.name}
              sx={{ 
                backgroundColor: '#252525',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {model.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Model: {model.modelName}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  API Base: {model.apiBase}
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  API Key: {showApiKey[model.name] ? model.apiKey : '••••••••'}
                  <IconButton 
                    size="small" 
                    onClick={() => toggleApiKeyVisibility(model.name)}
                    sx={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    {showApiKey[model.name] ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton 
                  size="small" 
                  onClick={() => handleOpenDialog(model)}
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => handleDelete(model.name)}
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>

        <Dialog 
          open={openDialog} 
          onClose={handleCloseDialog}
          PaperProps={{
            sx: {
              backgroundColor: '#252525',
              color: '#e0e0e0',
              minWidth: '400px',
              zIndex: 1,
            }
          }}
        >
          <DialogTitle>
            {editingModel ? 'Edit Model' : 'Add New Model'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                disabled={editingModel}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#e0e0e0',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.1)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                }}
              />
              <TextField
                label="Model Name"
                name="modelName"
                value={formData.modelName}
                onChange={handleInputChange}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#e0e0e0',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.1)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                }}
              />
              <TextField
                label="API Base URL"
                name="apiBase"
                value={formData.apiBase}
                onChange={handleInputChange}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#e0e0e0',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.1)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                }}
              />
              <TextField
                label="API Key"
                name="apiKey"
                type="password"
                value={formData.apiKey}
                onChange={handleInputChange}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#e0e0e0',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.1)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={handleCloseDialog}
              sx={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: '#404040',
                '&:hover': {
                  backgroundColor: '#505050',
                }
              }}
            >
              {editingModel ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={notification.open}
          autoHideDuration={3000}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          <Alert 
            severity={notification.severity}
            sx={{ 
              width: '100%',
              backgroundColor: notification.severity === 'success' ? '#1b5e20' : '#7f0000',
              color: '#ffffff'
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
