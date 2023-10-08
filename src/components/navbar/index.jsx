import LoggedUserProfile from './logged-user-profile';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

import './index.css';
import NavSearch from './search';


export default function Navbar() {
  return (
    <AppBar sx={{ bgcolor: '#222529' }} position='sticky'>
      <Toolbar className='custom-toolbar'>
        <Typography
          variant='h6'
          component={Link}
          to='/'
          sx={{
            fontFamily: "'Poppins', sans-serif", // Using Poppins font
            fontWeight: 700, // Bold weight
            color: '#ffffff', // White color
            letterSpacing: 1.5, // Slightly spaced letters for better visibility
            textTransform: 'uppercase', // Uppercase letters
            textDecoration: 'none', // No underline
          }}>
          Space Devs
        </Typography>

        <NavSearch/>

        <LoggedUserProfile />
      </Toolbar>
    </AppBar>
  );
}
