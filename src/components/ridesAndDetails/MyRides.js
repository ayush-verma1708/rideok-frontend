import React, { useState, useEffect, useCallback } from 'react';
import { getMyRides } from '../../api/rideApi'; // Assuming you have an API handler
import { Row, Col, Spinner, Button } from 'react-bootstrap';
import RideTile from '../common/RideTile'; // Assuming the RideTile component is in a separate file
import { useNavigate } from 'react-router-dom'; // Import the hook

const MyRides = ({ onRideSelect, userId }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch rides created by or for the logged-in user
  const fetchRides = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset the error before making a new request
    try {
      const response = await getMyRides(userId);

      // Check if the response is valid and an array, else set default
      if (response && Array.isArray(response) && response.length > 0) {
        setRides(response); // Set the fetched rides
      } else {
        setRides([]); // Explicitly setting an empty array if no rides are found
      }
    } catch (err) {
      setError('Unable to fetch rides. Please try again later.');
      console.error('Error fetching rides:', err);
      setRides([]); // Set an empty array if an error occurs
    } finally {
      setLoading(false);
    }
  }, [userId]); // Ensure it re-fetches when the userId changes

  // Retry fetching the rides in case of an error
  const handleRetry = () => {
    fetchRides();
  };

  useEffect(() => {
    fetchRides();
  }, [fetchRides]); // Use the useCallback hook to avoid unnecessary re-fetches

  if (loading) {
    return (
      <div className='text-center'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
        <p>Loading your rides...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center'>
        <p style={{ color: 'red' }}>{error}</p>
        <Button onClick={handleRetry}>Retry</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Your Created Rides
      </h2>
      {rides.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <p>
            You have not created any rides yet.
            <br />
            <Button
              variant='primary'
              onClick={() => {
                navigate('/create-ride'); // Navigate to the "create-ride" page
              }}
            >
              Create a Ride
            </Button>
          </p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className='g-4'>
          {rides.map((ride) => (
            <Col key={ride._id}>
              <RideTile
                currentUser={userId}
                ride={ride}
                onSelect={onRideSelect}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default MyRides;

// import React, { useState, useEffect } from 'react';
// import { getMyRides } from '../../api/rideApi.js'; // Assuming the API functions are in a separate file
// import { Row, Col, Spinner } from 'react-bootstrap';
// import RideTile from '../common/RideTile.js'; // Importing the new component

// const MyRides = ({ onRideSelect, userId }) => {
//   const [rides, setRides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch rides created by or for the logged-in user
//   useEffect(() => {
//     const fetchRides = async () => {
//       try {
//         setLoading(true);
//         setError(null); // Reset error state before making a request
//         const response = await getMyRides(userId); // Assuming you pass userId if needed in the API request

//         // Check if the response is valid and an array, else set default
//         if (response && Array.isArray(response) && response.length > 0) {
//           setRides(response); // Set the fetched rides
//         } else {
//           setRides([]); // Explicitly setting an empty array for no rides
//         }
//       } catch (err) {
//         setError('Error fetching rides. Please try again later.');
//         console.error('Error fetching rides:', err); // Log error for debugging
//         setRides([]); // Set an empty array in case of error, as no rides could be fetched
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRides();
//   }, [userId]); // Now using userId as a dependency in case it changes

//   if (loading) {
//     return (
//       <div className='text-center'>
//         <Spinner animation='border' role='status'>
//           <span className='visually-hidden'>Loading...</span>
//         </Spinner>
//         <p>Loading your rides...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
//         Your Created Rides
//       </h2>
//       {rides.length === 0 ? (
//         <p style={{ textAlign: 'center' }}>
//           {error
//             ? 'Unable to fetch your rides. Please try again later.'
//             : 'You have not created any rides yet.'}
//         </p>
//       ) : (
//         <Row xs={1} md={2} lg={3} className='g-4'>
//           {rides.map((ride) => (
//             <Col key={ride._id}>
//               <RideTile
//                 currentUser={userId}
//                 ride={ride}
//                 onSelect={onRideSelect}
//               />
//             </Col>
//           ))}
//         </Row>
//       )}
//     </div>
//   );
// };

// export default MyRides;

// // import React, { useState, useEffect } from 'react';
// // import { getMyRides } from '../../api/rideApi.js'; // Assuming the API functions are in a separate file
// // import { Row, Col, Spinner } from 'react-bootstrap';
// // import RideTile from '../common/RideTile.js'; // Importing the new component

// // const MyRides = ({ onRideSelect }, userId) => {
// //   const [rides, setRides] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Fetch rides created by the logged-in user
// //   useEffect(() => {
// //     const fetchRides = async () => {
// //       try {
// //         setLoading(true);
// //         setError(''); // Reset error state before making a request
// //         const response = await getMyRides();

// //         // Check if the response is valid and an array, else set default
// //         if (response && Array.isArray(response) && response.length > 0) {
// //           setRides(response); // Set the fetched rides
// //         } else {
// //           setRides([{ name: 'No rides available' }]); // Set a default ride if no response
// //         }
// //       } catch (err) {
// //         setError('Error fetching rides. Please try again later.');
// //         console.error('Error fetching rides:', err); // Log error for debugging
// //         setRides([{ name: 'No rides available' }]); // Set a default ride in case of error
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchRides();
// //   }, []); // Empty dependency array ensures this runs once when the component mounts

// //   if (loading) {
// //     return (
// //       <div className='text-center'>
// //         <Spinner animation='border' role='status'>
// //           <span className='visually-hidden'>Loading...</span>
// //         </Spinner>
// //         <p>Loading your rides...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
// //   }

// //   return (
// //     <div style={{ padding: '20px' }}>
// //       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
// //         Your Created Rides
// //       </h2>
// //       {rides.length === 0 ? (
// //         <p style={{ textAlign: 'center' }}>
// //           You have not created any rides yet.
// //         </p>
// //       ) : (
// //         <Row xs={1} md={2} lg={3} className='g-4'>
// //           {rides.map((ride) => (
// //             <Col key={ride._id}>
// //               <RideTile
// //                 currentUser={userId}
// //                 ride={ride}
// //                 onSelect={onRideSelect}
// //               />
// //             </Col>
// //           ))}
// //         </Row>
// //       )}
// //     </div>
// //   );
// // };

// // export default MyRides;

// // import React, { useState, useEffect } from 'react';
// // import { getMyRides } from '../../api/rideApi.js'; // Assuming the API functions are in a separate file
// // import { Button, Card, Row, Col, Spinner } from 'react-bootstrap';

// // const MyRides = ({ onRideSelect }) => {
// //   const [rides, setRides] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Fetch rides created by the logged-in user
// //   useEffect(() => {
// //     const fetchRides = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await getMyRides();
// //         setRides(response); // Assuming response is an array of rides
// //       } catch (err) {
// //         setError('Error fetching rides. Please try again later.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchRides();
// //   }, []); // Empty dependency array ensures this runs once when the component mounts

// //   if (loading) {
// //     return (
// //       <div className='text-center'>
// //         <Spinner animation='border' role='status'>
// //           <span className='visually-hidden'>Loading...</span>
// //         </Spinner>
// //         <p>Loading your rides...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
// //   }

// //   const handleRideSelection = (rideId) => {
// //     onRideSelect(rideId); // Call the parent handler
// //   };

// //   return (
// //     <div style={{ padding: '20px' }}>
// //       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
// //         Your Created Rides
// //       </h2>
// //       {rides.length === 0 ? (
// //         <p style={{ textAlign: 'center' }}>
// //           You have not created any rides yet.
// //         </p>
// //       ) : (
// //         <Row xs={1} md={2} lg={3} className='g-4'>
// //           {rides.map((ride) => (
// //             <Col key={ride._id}>
// //               <Card
// //                 style={{
// //                   borderRadius: '10px',
// //                   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// //                   transition: 'transform 0.3s, box-shadow 0.3s',
// //                 }}
// //                 className='h-100'
// //                 onMouseEnter={(e) =>
// //                   (e.currentTarget.style.transform = 'scale(1.05)')
// //                 }
// //                 onMouseLeave={(e) =>
// //                   (e.currentTarget.style.transform = 'scale(1)')
// //                 }
// //               >
// //                 <Card.Body>
// //                   <Card.Title className='text-center'>
// //                     Ride from <strong>{ride.startLocation}</strong> to{' '}
// //                     <strong>{ride.endLocation}</strong>
// //                   </Card.Title>
// //                   <Card.Subtitle className='mb-2 text-muted text-center'>
// //                     <strong>Driver:</strong> {ride.driver.name} (
// //                     {ride.driver.email})
// //                   </Card.Subtitle>
// //                   <Card.Text className='text-center'>
// //                     <strong>Price: ₹{ride.price.toFixed(2)}</strong>
// //                   </Card.Text>
// //                   <Card.Text className='text-center'>
// //                     <strong>Available Seats: </strong> {ride.availableSeats}
// //                   </Card.Text>
// //                   <Card.Text className='text-center'>
// //                     <strong>Ride Date: </strong>{' '}
// //                     {new Date(ride.rideDate).toLocaleDateString()}
// //                   </Card.Text>
// //                   <Card.Text className='text-center'>
// //                     <strong>Passengers: </strong> {ride.passengers.length}
// //                   </Card.Text>
// //                   <div className='text-center'>
// //                     <span
// //                       style={{
// //                         color: ride.availableSeats > 0 ? 'green' : 'red',
// //                         fontWeight: 'bold',
// //                       }}
// //                     >
// //                       {ride.availableSeats > 0 ? 'Available' : 'Fully Booked'}
// //                     </span>
// //                   </div>
// //                 </Card.Body>
// //                 <Card.Footer className='text-center'>
// //                   <Button
// //                     variant='primary'
// //                     onClick={() => handleRideSelection(ride._id)}
// //                     style={{
// //                       width: '100%',
// //                       padding: '10px',
// //                       borderRadius: '5px',
// //                       backgroundColor: '#2196F3',
// //                       borderColor: '#2196F3',
// //                       color: 'white',
// //                     }}
// //                   >
// //                     Select Ride
// //                   </Button>
// //                 </Card.Footer>
// //               </Card>
// //             </Col>
// //           ))}
// //         </Row>
// //       )}
// //     </div>
// //   );
// // };

// // export default MyRides;
