import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/generalComponents/Header.js';
import HomePage from './pages/HomePage.js';
import Onboarding from './pages/onBoarding.js';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/onboarding' element={<Onboarding />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
