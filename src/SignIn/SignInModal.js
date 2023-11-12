
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link'; 

const SignInModal = ({ open, onClose ,onSignUpClick,setAuth,setDoctor,set}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async() => {
    // Implemeting sign-in logic here
    console.log('Signing in with:', { email, password });

    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // function to handle successful sign-in
        handleSuccessfulSignIn(data);
        onClose(); 
      } else {
        // Handle authentication failure
        console.error('Sign-in failed');
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
    }

  };

  const handleSuccessfulSignIn = (userData) => {
    localStorage.setItem('authToken', userData.token);
    setAuth(true);
    setDoctor(userData.isDoctor);
    set(userData.email);
    console.log('User signed in successfully:', userData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Typography variant="body2" color="textSecondary">
          Don't have an account?{' '}
          <Link component="button" onClick={onSignUpClick} color="primary">
            Sign Up
          </Link>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSignIn} color="primary" variant="contained">
          Sign In
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignInModal;
