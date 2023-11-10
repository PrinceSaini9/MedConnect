
import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; 


const Home = ({ onSignInClick, onSignUpClick }) => {

  return (
    <Container>
      <Grid container spacing={2}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome to Med<span className='text-info'>Connect</span>
          </Typography>
          <Typography variant="body1" align="center" paragraph>
          MedConnect is your go-to platform for convenient and reliable telemedicine services. Connect with healthcare
        professionals, schedule virtual appointments, and manage your health from the comfort of your home.          </Typography>
        </Grid>

        {/* Authentication Section */}
        <Grid item xs={12} sm={6}>
          {/* Sign In Button */}
          <Button variant="contained" color="primary" onClick={onSignInClick} fullWidth>
            Sign In
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Sign Up Button */}
          <Button variant="outlined" color="primary" onClick={onSignUpClick} fullWidth>
            Sign Up
          </Button>
        </Grid>

        {/* Featured Services Section */}
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
          Explore our services and features to experience the future of healthcare.
          </Typography>
          {/* Include your featured services content here */}
          <li>User Management</li>
          <li>Appointment Scheduling</li>
          <li>Consultation Management</li>
          <li>User Messaging</li>
        </Grid>

        

        {/* Call-to-Action Section */}
        <Grid item xs={12}>
          {/* Add a prominent CTA button */}
          <Button variant="contained" color="primary" fullWidth>
            Schedule an Appointment
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
