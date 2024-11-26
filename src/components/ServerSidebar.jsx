import { Box, IconButton, Tooltip, Divider } from '@mui/material';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useLocation, useNavigate } from 'react-router-dom';

const SidebarIcon = ({ icon: Icon, tooltip, isActive, onClick }) => (
  <Tooltip title={tooltip} placement="right" arrow>
    <IconButton
      onClick={onClick}
      sx={{
        width: 48,
        height: 48,
        borderRadius: '12px',
        backgroundColor: isActive ? '#1a1a1a' : 'transparent',
        color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: '#1a1a1a',
          color: 'white',
          transform: 'translateY(-2px)',
        },
        '&::before': isActive ? {
          content: '""',
          position: 'absolute',
          left: -8,
          width: 4,
          height: 20,
          backgroundColor: 'white',
          borderRadius: '0 4px 4px 0',
        } : {},
      }}
    >
      <Icon sx={{ fontSize: 24 }} />
    </IconButton>
  </Tooltip>
);

export default function ServerSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path) => location.pathname === path;

  return (
    <Box
      sx={{
        width: '72px',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
        gap: 1,
        borderRight: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <SidebarIcon
        icon={HomeOutlinedIcon}
        tooltip="Home"
        isActive={isActive('/')}
        onClick={() => navigate('/')}
      />
      
      <SidebarIcon
        icon={ChatOutlinedIcon}
        tooltip="Chats"
        isActive={isActive('/chats')}
        onClick={() => navigate('/chats')}
      />

      <SidebarIcon
        icon={FolderOutlinedIcon}
        tooltip="Documents"
        isActive={isActive('/documents')}
        onClick={() => navigate('/documents')}
      />

      <Box flexGrow={1} />

      <Divider sx={{ width: '32px', my: 1, borderColor: 'rgba(255,255,255,0.1)' }} />

      <SidebarIcon
        icon={SettingsOutlinedIcon}
        tooltip="Settings"
        isActive={isActive('/settings')}
        onClick={() => navigate('/settings')}
      />
    </Box>
  );
}
