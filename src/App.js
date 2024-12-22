import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/generalComponents/Header.js';
import HomePage from './pages/HomePage.js';
import Onboarding from './pages/onBoarding.js';
import RideManagementPage from './pages/rideManagementPage.js';
import CreateRidePage from './pages/CreateRidePage.js';
import MyRidesPage from './pages/MyRidesPage.js';
import RideInfo from './pages/RideInfoPage.js';
import {
  AuthProvider,
  useAuth,
} from './components/generalComponents/authContext.js';
import AboutUs from './pages/AboutUs.js';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePageWithUser />} />
          <Route path='/onboarding' element={<Onboarding />} />
          <Route
            path='/RideManagementPage'
            element={<RideManagementPageWithUser />}
          />
          <Route path='/create-ride' element={<CreateRidePageWithUser />} />
          <Route path='/my-rides' element={<MyRidesPageWithUser />} />
          <Route path='/ride/:id' element={<RideInfoWithUser />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// Example of how you can wrap components with user information
const HomePageWithUser = () => {
  const { state } = useAuth();
  const userId = state.user?.id; // Access user ID from state

  return <HomePage userId={userId} />;
};

const RideManagementPageWithUser = () => {
  const { state } = useAuth();
  const userId = state.user?.id;

  return <RideManagementPage userId={userId} />;
};

const CreateRidePageWithUser = () => {
  const { state } = useAuth();
  const userId = state.user?.id;

  return <CreateRidePage userId={userId} />;
};

const MyRidesPageWithUser = () => {
  const { state } = useAuth();
  const userId = state.user?.id;

  return <MyRidesPage userId={userId} />;
};

const RideInfoWithUser = () => {
  const { state } = useAuth();
  const userId = state.user?.id;

  return <RideInfo userId={userId} />;
};

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/generalComponents/Header.js';
// import HomePage from './pages/HomePage.js';
// import Onboarding from './pages/onBoarding.js';
// import RideManagementPage from './pages/rideManagementPage.js';
// import CreateRidePage from './pages/CreateRidePage.js';
// import MyRidesPage from './pages/MyRidesPage.js';
// import RideInfo from './pages/RideInfoPage.js';
// import { AuthProvider } from './components/generalComponents/authContext.js';
// import AboutUs from './pages/AboutUs.js';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Header />
//         <Routes>
//           <Route path='/' element={<HomePage />} />
//           <Route path='/onboarding' element={<Onboarding />} />
//           <Route path='/RideManagementPage' element={<RideManagementPage />} />
//           <Route path='/create-ride' element={<CreateRidePage />} />
//           <Route path='/my-rides' element={<MyRidesPage />} />{' '}
//           <Route path='/ride/:id' element={<RideInfo />} />{' '}
//           <Route path='/about-us' element={<AboutUs />} />
//           <Route path='*' element={<h1>Not Found</h1>} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;
