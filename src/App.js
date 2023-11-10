
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
  return (
    <Router>
      <div>
        <Header onSignInClick={handleSignInModalOpen} onSignUpClick={handleSignUpModalOpen} />
        <Routes>
          <Route exact path="/"  element={<Home onSignInClick={handleSignInModalOpen} onSignUpClick={handleSignUpModalOpen} />} />
          {/* <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/profile" component={Profile} />
          <Route path="/schedule" component={ScheduleAppointment} /> */}
        </Routes>
        <SignInModal open={signInModalOpen} onClose={handleSignInModalClose} onSignUpClick={handleSignUpModalOpen}/>
        <SignUpModal open={signUpModalOpen} onClose={handleSignUpModalClose} onSignInClick={handleSignInModalOpen} />

      </div>
    </Router>
  );
};

export default App;
