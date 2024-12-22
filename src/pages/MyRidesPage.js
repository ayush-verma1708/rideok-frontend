import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MyRides from '../components/ridesAndDetails/MyRides';
import { useAuth } from '../components/generalComponents/authContext'; // Import the useAuth hook

const MyRidesPage = ({ userId }) => {
  const { state } = useAuth(); // Access user and token from the auth context
  const { user } = state; // Destructure the user from state
  const [selectedRideId, setSelectedRideId] = useState(null);

  const handleRideSelection = (rideId) => {
    console.log(rideId);
    setSelectedRideId(rideId);
  };

  return (
    <Container>
      <Row className='justify-content-center my-5'>
        {user ? (
          <>
            <h2>My Rides</h2>
            <MyRides userId={userId} onRideSelect={handleRideSelection} />{' '}
            {/* Show user's rides component */}
          </>
        ) : (
          <h3>Please log in to view your rides</h3> // Message if user is not logged in
        )}
      </Row>
    </Container>
  );
};

export default MyRidesPage;

// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import MyRides from '../components/ridesAndDetails/MyRides';
// const MyRidesPage = () => {
//   return (
//     <Container>
//       <Row className='justify-content-center my-5'>
//         <Col xs={12} md={8} lg={6}>
//           <h2>My Rides</h2>
//           <MyRides />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default MyRidesPage;
