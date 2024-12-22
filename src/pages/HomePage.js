import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/generalComponents/authContext'; // Import the useAuth hook
import { Container, Row } from 'react-bootstrap';
import SearchRides from '../components/ridesAndDetails/SearchRides';

const HomePage = () => {
  const { state } = useAuth(); // Access user and token from the auth context
  const { user, token } = state; // Destructure the user and token from state
  const [isVerified, setIsVerified] = useState(false);

  // Function to verify if user is authenticated
  const verifyUser = () => {
    if (user && token) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  useEffect(() => {
    verifyUser(); // Verify user when component mounts or state changes
  }, [user, token]); // Re-run whenever user or token changes

  return (
    <div>
      {/* Main Content */}
      <Container className='py-5'>
        <h1 className='text-center mb-4'>Welcome to RideOK</h1>

        {isVerified ? (
          <h2 className='text-center mb-4'>Hello, {user?.name || 'User'}!</h2> // Display user name
        ) : (
          <h3 className='text-center mb-4'>
            Start sharing rides to save costs and the environment!
          </h3>
        )}

        {/* Features Section */}
        <Row className='text-center'>
          <SearchRides user={user} />
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Navbar, Nav, Button, Container, Row } from 'react-bootstrap';
// import { useAuth } from '../components/generalComponents/authContext'; // Import the useAuth hook
// import SearchRides from '../components/ridesAndDetails/SearchRides';

// const HomePage = ({ userId }) => {
//   const { state } = useAuth(); // Access user and token from the auth context
//   const { user } = state; // Destructure the user from state

//   return (
//     <div>
//       {/* Main Content */}
//       <Container className='py-5'>
//         <h1 className='text-center mb-4'>Welcome to RideOK</h1>
//         {user ? (
//           <h2 className='text-center mb-4'>Hello, {userId}!</h2>
//         ) : (
//           <h3 className='text-center mb-4'>
//             Start sharing rides to save costs and the environment!
//           </h3>
//         )}

//         {/* Features Section */}
//         <Row className='text-center'>
//           <SearchRides />
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default HomePage;
