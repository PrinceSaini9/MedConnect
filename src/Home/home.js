
import React,{useState,useEffect} from 'react';
import Container from '@mui/material/Container';
import { Grid, Card, CardHeader, CardContent, Button , Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem ,Alert, Snackbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';




const Home = ({ onSignInClick, onSignUpClick ,isAuth,isDoctor,email

}) => {  

  const [doctorData, setDoctorData] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [timeIntervals, setTimeIntervals] = useState([]);
  const [message, setMessage] = useState('');
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [form,setForm]=useState(false);
  const[data,setData]=useState({});
  const [name, setName] = useState('');
  const [hospital, setHospital] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [availableDays, setAvailableDays] = useState([]);
  const [fees, setFees] = useState('');


  const onClose=()=>{
    setForm(false);
  }
  const handleSave=()=>{
    const doctorDat = {
      name,
      hospital,
      specialist,
      availableTime,
      availableDays,
      fees,
      email
    };

     fetch('http://localhost:5000/api/postDoctor', {
      method: 'POST',
      mode:'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctorDat),
    })
    .then(response=>response.json())
    .then(d=>setData(d))
    .catch(e=>{
      console.log(e);
    })
    onClose();
  }
  
  const generateTimeIntervals = (availableTime) => {
    const intervals = [];
    const [start, end] = availableTime.split('-').map(time => time.trim());

    const startTime = new Date(`2022-01-01 ${start}`);
    const endTime = new Date(`2022-01-01 ${end}`);
    const interval = 30 * 60 * 1000; // 30 minutes in milliseconds

    let currentTime = startTime;

    while (currentTime <= endTime) {
      intervals.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      currentTime = new Date(currentTime.getTime() + interval);
    }

    setTimeIntervals(intervals);
  };

  const handleSetAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenModal(true);
    generateTimeIntervals(doctor.availableTime);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedDay('');
    setSelectedTime('');
  };

  const handleAppointmentSubmit = () => {
    setSnackbarMessage(`Appointment set for ${selectedDoctor.name} on ${selectedDay} at ${selectedTime}`);
    setSnackbarOpen(true);
    handleModalClose();
  };

  const handleOpenMessageDialog = (doctor) => {
    setSelectedDoctor(doctor);
    setMessageDialogOpen(true);
    setMessage('');
  };
  
  const handleCloseMessageDialog = () => {
    setMessageDialogOpen(false);
  };

  const handleSendMessage = () => {
    setSnackbarMessage(`Message sent to ${selectedDoctor.name}: ${message}`);
    setSnackbarOpen(true);
    handleCloseMessageDialog();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    // Fetch doctor data from the API
    fetch('http://localhost:5000/api/doctors') 
      .then(response => response.json())
      .then(data => setDoctorData(data))
      .catch(error => console.error('Error fetching doctor data:', error));
}, [])

  useEffect(()=>{
    
    fetch(`http://localhost:5000/api/doctor/${email}`) 
    .then(async(response) => {
      console.log(response);
      if(response.ok){

       const dat = await  response.json();
        setData(dat);
        setForm(false);
      }
      else{
        setForm(true);
      }

    })
    .catch(error => console.error('Error fetching doctor data:', error));

  },[email])

  if(!isAuth){
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
  }
  else if(!isDoctor) {
    return(
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
  
          <Grid container spacing={2} justifyContent="center">
      {doctorData && doctorData.length > 0 ? (
        doctorData.map(doctor => (
          <Grid key={doctor.id} item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader
                title="Doctor Information"
                style={{ backgroundColor: '#3498db', color: '#fff', textAlign: 'center' }}
              />
              <CardContent>
                <h2>{doctor.name}</h2>
                <p>Hospital: {doctor.hospital}</p>
                <p>Specialist: {doctor.specialist}</p>
                <p>Available Time: {doctor.availableTime}</p>
                <p>Available Days: {doctor.availableDays.join(', ')}</p>
                <p>Fees: {doctor.fees}</p>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                  <Button variant="contained" color="success"onClick={() => handleSetAppointment(doctor)}>
                    Set Appointment
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleOpenMessageDialog(doctor)}>
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <p>Loading doctor data...</p>
      )}

<Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} variant="filled" severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

<Dialog open={messageDialogOpen} onClose={handleCloseMessageDialog}>
          <DialogTitle>Send Message to {selectedDoctor && selectedDoctor.name}</DialogTitle>
          <DialogContent>
            <TextField
              label="Message"
              multiline
              rows={4}
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMessageDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSendMessage} color="success" variant="contained">
              Send Message
            </Button>
          </DialogActions>
        </Dialog>

<Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Set Appointment</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Select Day"
            fullWidth
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {selectedDoctor && selectedDoctor.availableDays.map(day => (
              <MenuItem key={day} value={day}>{day}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select Time"
            fullWidth
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            {timeIntervals.map(interval => (
              <MenuItem key={interval} value={interval}>{interval}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleAppointmentSubmit} variant="contained" color="success">
            Set Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  
        </Grid>
      </Container>
    )
  }
  else{
    return(
      <>
  {
    form?(
<Dialog open={form} onClose={onClose}>
      <DialogTitle>Doctor Details</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Hospital"
          fullWidth
          margin="normal"
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          margin="normal"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <TextField
          label="Available Time"
          fullWidth
          margin="normal"
          value={availableTime}
          onChange={(e) => setAvailableTime(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="available-days-label">Available Days</InputLabel>
          <Select
            labelId="available-days-label"
            id="available-days"
            multiple
            value={availableDays}
            onChange={(e) => setAvailableDays(e.target.value)}
            label="Available Days"
          >
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Fees"
          fullWidth
          margin="normal"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
    ):(
      <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {data.specialist} at {data.hospital}
        </Typography>
        <Typography color="textSecondary" paragraph>
          Available Time: {data.availableTime}
        </Typography>
        <Typography color="textSecondary" paragraph>
          Available Days: {data.availableDays.join(', ')}
        </Typography>
        <Typography color="textSecondary" paragraph>
          Fees: {data.fees}
        </Typography>
      </CardContent>
    </Card>
    )
  }
      </>
    )
  }
};

export default Home;
