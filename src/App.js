import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/generalComponents/Header.js';
import HomePage from './pages/HomePage.js';
import Onboarding from './pages/onBoarding.js';
import RideManagementPage from './pages/rideManagementPage.js';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/onboarding' element={<Onboarding />} />
        <Route path='/RideManagementPage' element={<RideManagementPage />} />
      </Routes>
    </Router>
  );
};

export default App;
