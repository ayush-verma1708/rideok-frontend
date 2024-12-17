import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Onboarding from './components/onBoarding.js';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/on-boarding' element={<Onboarding />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
