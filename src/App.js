import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/generalComponents/Header.js';
import HomePage from './pages/HomePage.js';
import Onboarding from './pages/onBoarding.js';
import RideManagementPage from './pages/rideManagementPage.js';
import CreateRidePage from './pages/CreateRidePage.js';
import MyRidesPage from './pages/MyRidesPage.js';
import { AuthProvider } from './components/generalComponents/authContext.js';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/onboarding' element={<Onboarding />} />
          <Route path='/RideManagementPage' element={<RideManagementPage />} />
          <Route path='/create-ride' element={<CreateRidePage />} />
          <Route path='/my-rides' element={<MyRidesPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
