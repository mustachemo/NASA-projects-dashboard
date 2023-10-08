import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { auth } from 'src/setup/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function LoggedUserWheel() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user] = useAuthState(auth);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.displayName} src={user.photoURL} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        <MenuItem component={Link} to={`profile/${user.uid}`} onClick={handleCloseUserMenu}>
          <Typography textAlign='center'>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign='center'>Account</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign='center'>Dashboard</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography onClick={() => auth.signOut()} textAlign='center'>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
