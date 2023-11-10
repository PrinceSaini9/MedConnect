
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import 'bootstrap/dist/css/bootstrap.min.css'; 


const Header = ({ onSignInClick }) => {
  return (
    <AppBar position="static" className="bg-success">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Med<span className='text-info'>Connect</span>
        </Typography>
        <Tooltip title="Home" arrow>
          <Button component={Link} to="/" color="inherit">
            <HomeIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Sign In" arrow>
          <Button onClick ={onSignInClick} component={Link}  color="inherit">
            <LoginIcon></LoginIcon>
          </Button>
        </Tooltip>
        <Tooltip title="Your Profile" arrow>
          <Button component={Link} to="/profile" color="inherit">
            <AccountCircleIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Schedule Appointment" arrow>
          <Button component={Link} to="/schedule" color="inherit">
            <EventIcon />
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
