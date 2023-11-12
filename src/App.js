
import React  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/header';
import Home from './Home/home';
import SignInModal from './SignIn/SignInModal';
import { useState } from 'react';
import SignUpModal from './SignUp/SignUpModal';
// import Profile from './Profile';
// import ScheduleAppointment from './ScheduleAppointment';

const App = () => {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const[isAuth,setAuth]=useState(false);
  const[isDoctor,setDoctor]=useState(false);
  const [email,setEmail] = useState('');


  const handleSignInModalOpen = () => {
    setSignUpModalOpen(false);
    setSignInModalOpen(true);
  };

  const handleSignInModalClose = () => {
    setSignInModalOpen(false);
  };

  const handleSignUpModalOpen = () => {
    setSignInModalOpen(false);
    setSignUpModalOpen(true);
  };

  const handleSignUpModalClose = () => {
    setSignUpModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuth(false);
  };
  return (
    <Router>
      <div>
        <Header onSignInClick={handleSignInModalOpen} isAuth={isAuth} handleLogOut={handleLogout} />
        <Routes>
          <Route exact path="/"  element={<Home onSignInClick={handleSignInModalOpen} onSignUpClick={handleSignUpModalOpen} isAuth={isAuth} isDoctor={isDoctor} email={email} />} />
          {/* <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/profile" component={Profile} />
          <Route path="/schedule" component={ScheduleAppointment} /> */}
        </Routes>
        <SignInModal open={signInModalOpen} onClose={handleSignInModalClose} onSignUpClick={handleSignUpModalOpen} setAuth={setAuth} setDoctor={setDoctor} set={setEmail}/>
        <SignUpModal open={signUpModalOpen} onClose={handleSignUpModalClose} onSignInClick={handleSignInModalOpen} />

      </div>
    </Router>
  );
};

export default App;
