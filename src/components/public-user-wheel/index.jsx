import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';

export default function PublicUserWheel(props) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title='User Actions'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={props.publicuser.displayName} src={props.publicuser.photoURL} />
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
          
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign='center'>Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign='center'>Message</Typography>
            </MenuItem>
          
        </Menu>
      </Box>
    );
  }

PublicUserWheel.propTypes = {
  publicuser: PropTypes.any.isRequired
}