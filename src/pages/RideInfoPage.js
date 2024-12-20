import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spinner, Row, Col } from 'react-bootstrap';
import { getRideDetails } from '../api/rideApi.js';
import { getUserProfile } from '../api/userApi'; // Import getUserProfile from userApi
import RideMapView from '../components/RideMap/RideMapView'; // Import the map view component
import PassengerRideInfo from '../components/common/PassengerInfo.js'; // Import the passenger view
import DriverRideInfo from '../components/common/DriverRideInfo.js'; // Import the passenger view

const RideInfo = () => {
  const { id } = useParams(); // Get the ride ID from the URL
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null); // To store current user details

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const rideData = await getRideDetails(id);
        setRide(rideData);
      } catch (error) {
        console.error('Error fetching ride details:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile(localStorage.getItem('token')); // Assuming token is saved in localStorage
        setCurrentUser(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchRideDetails();
    fetchUserProfile();
  }, [id]);

  const calculateFare = (ride) => {
    const totalFare = ride.price; // Total fare for the ride
    const availableSeats = ride.availableSeats;
    const totalPeople = availableSeats + 1; // Total people (driver + passengers)

    // Base cost per passenger
    const baseFarePerPassenger = totalFare / totalPeople;

    // Driver's share (smaller share, since they're the ride creator)
    const driverShare = baseFarePerPassenger * 0.7; // The driver pays 70% of the base fare

    // Passengers' share (remainder of the total fare)
    const passengerFare = baseFarePerPassenger * 1.3; // Passengers pay the remaining 30%

    // Optional: CO2 savings (as a discount)
    const distance = ride.distance || 0; // Distance in kilometers (from ride details)
    const co2PerKm = 0.2; // Approximate CO2 emitted per km per passenger in kg
    const totalPassengers = ride.passengers.length + 1; // Driver + passengers

    // Calculate CO2 savings: If there were separate cars for each passenger, how much CO2 would be saved by carpooling?
    const co2Savings = distance * co2PerKm * totalPassengers; // Total CO2 saved
    const co2Discount = co2Savings > 0 ? co2Savings * 5 : 0; // CO2 savings discount (e.g., 5 INR per kg of CO2 saved)

    // Adjust the passenger fare based on the CO2 savings
    const adjustedPassengerFare = passengerFare - co2Discount;

    // Return the breakdown of fares and CO2 savings
    return {
      driverShare,
      passengerFare: adjustedPassengerFare,
      totalFare,
      co2Savings, // Total CO2 savings in kg
      adjustedPassengerFare,
    };
  };

  if (loading) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!ride) {
    return <div className='text-center'>Ride not found</div>;
  }

  const {
    driverShare,
    passengerFare,
    totalFare,
    co2Savings,
    adjustedPassengerFare,
  } = calculateFare(ride);

  // Check if the current user is the driver
  const isDriver = currentUser?._id === ride.driver._id;

  return (
    <div className='container my-5'>
      <Card className='shadow-sm rounded'>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Card.Title className='text-center mb-3'>
                <strong>Ride Details</strong>
              </Card.Title>
              <Card.Subtitle className='mb-2 text-muted text-center'>
                <strong>Driver:</strong> {ride.driver.name} <br />
                <small>({ride.driver.email})</small>
              </Card.Subtitle>

              {/* Conditionally render components for passenger and driver */}
              {isDriver ? (
                <DriverRideInfo ride={ride} />
              ) : (
                <PassengerRideInfo
                  ride={ride}
                  adjustedPassengerFare={adjustedPassengerFare}
                  co2Savings={co2Savings}
                />
              )}
            </Col>

            <Col md={6}>
              <RideMapView
                startLocation={ride.startLocation}
                endLocation={ride.endLocation}
              />
            </Col>
          </Row>

          <div className='text-center mt-4'>
            <span
              style={{
                color: ride.availableSeats > 0 ? 'green' : 'red',
                fontWeight: 'bold',
                fontSize: '1.2em',
              }}
            >
              {ride.availableSeats > 0 ? 'Seats Available ' : 'Fully Booked'}
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RideInfo;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Card, Spinner, Row, Col, Button } from 'react-bootstrap';
// import { getRideDetails } from '../api/rideApi.js';
// import { getUserProfile } from '../api/userApi'; // Import getUserProfile from userApi
// import RideMapView from '../components/RideMap/RideMapView'; // Import the map view component

// const RideInfo = () => {
//   const { id } = useParams(); // Get the ride ID from the URL
//   const [ride, setRide] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null); // To store current user details

//   useEffect(() => {
//     const fetchRideDetails = async () => {
//       try {
//         const rideData = await getRideDetails(id);
//         setRide(rideData);
//       } catch (error) {
//         console.error('Error fetching ride details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchUserProfile = async () => {
//       try {
//         const userProfile = await getUserProfile(localStorage.getItem('token')); // Assuming token is saved in localStorage
//         setCurrentUser(userProfile);
//       } catch (error) {
//         console.error('Error fetching user profile:', error);
//       }
//     };

//     fetchRideDetails();
//     fetchUserProfile();
//   }, [id]);

//   const calculateFare = (ride) => {
//     const totalFare = ride.price; // Total fare for the ride
//     const availableSeats = ride.availableSeats;
//     const totalPeople = availableSeats + 1; // Total people (driver + passengers)

//     // Base cost per passenger
//     const baseFarePerPassenger = totalFare / totalPeople;

//     // Driver's share (smaller share, since they're the ride creator)
//     const driverShare = baseFarePerPassenger * 0.7; // The driver pays 70% of the base fare

//     // Passengers' share (remainder of the total fare)
//     const passengerFare = baseFarePerPassenger * 1.3; // Passengers pay the remaining 30%

//     // Optional: CO2 savings (as a discount)
//     const distance = ride.distance || 0; // Distance in kilometers (from ride details)
//     const co2PerKm = 0.2; // Approximate CO2 emitted per km per passenger in kg
//     const totalPassengers = ride.passengers.length + 1; // Driver + passengers

//     // Calculate CO2 savings: If there were separate cars for each passenger, how much CO2 would be saved by carpooling?
//     const co2Savings = distance * co2PerKm * totalPassengers; // Total CO2 saved
//     const co2Discount = co2Savings > 0 ? co2Savings * 5 : 0; // CO2 savings discount (e.g., 5 INR per kg of CO2 saved)

//     // Adjust the passenger fare based on the CO2 savings
//     const adjustedPassengerFare = passengerFare - co2Discount;

//     // Return the breakdown of fares and CO2 savings
//     return {
//       driverShare,
//       passengerFare: adjustedPassengerFare,
//       totalFare,
//       co2Savings, // Total CO2 savings in kg
//       adjustedPassengerFare,
//     };
//   };

//   if (loading) {
//     return (
//       <div
//         className='d-flex justify-content-center align-items-center'
//         style={{ height: '100vh' }}
//       >
//         <Spinner animation='border' role='status'>
//           <span className='visually-hidden'>Loading...</span>
//         </Spinner>
//       </div>
//     );
//   }

//   if (!ride) {
//     return <div className='text-center'>Ride not found</div>;
//   }

//   const {
//     driverShare,
//     passengerFare,
//     totalFare,
//     co2Savings,
//     adjustedPassengerFare,
//   } = calculateFare(ride);

//   // Check if the current user is the driver
//   const isDriver = currentUser?._id === ride.driver._id;

//   return (
//     <div className='container my-5'>
//       <Card className='shadow-sm rounded'>
//         <Card.Body>
//           <Row>
//             <Col md={6}>
//               <Card.Title className='text-center mb-3'>
//                 <strong>Ride Details</strong>
//               </Card.Title>
//               <Card.Subtitle className='mb-2 text-muted text-center'>
//                 <strong>Driver:</strong> {ride.driver.name} <br />
//                 <small>({ride.driver.email})</small>
//               </Card.Subtitle>
//               <Card.Text>
//                 <strong>Price (Total):</strong> ₹{totalFare.toFixed(2)}
//               </Card.Text>
//               <Card.Text>
//                 <strong>Driver's Share:</strong> ₹{driverShare.toFixed(2)}
//               </Card.Text>

//               <Card.Text>
//                 <strong>Passenger Fare:</strong> ₹
//                 {adjustedPassengerFare.toFixed(2)}{' '}
//                 {co2Savings > 0 && (
//                   <span className='text-success'>
//                     (CO2 Savings Discount: ₹{(co2Savings * 5).toFixed(2)})
//                   </span>
//                 )}
//               </Card.Text>
//               <Card.Text>
//                 <strong>Available Seats:</strong> {ride.availableSeats}
//               </Card.Text>
//               <Card.Text>
//                 <strong>Ride Date:</strong>{' '}
//                 {new Date(ride.rideDate).toLocaleDateString()}
//               </Card.Text>

//               <Card.Text>
//                 <strong>Passengers:</strong>{' '}
//                 {ride.passengers.length > 0
//                   ? ride.passengers.join(', ')
//                   : 'None'}
//               </Card.Text>

//               {/* UI for Passengers */}
//               {!isDriver && (
//                 <Button
//                   variant='primary'
//                   className='w-100'
//                   disabled={ride.availableSeats <= 0}
//                   style={{
//                     backgroundColor:
//                       ride.availableSeats > 0 ? '#28a745' : '#dc3545',
//                   }}
//                 >
//                   {ride.availableSeats > 0 ? 'Join Ride' : 'Fully Booked'}
//                 </Button>
//               )}

//               {/* UI for Driver */}
//               {isDriver && (
//                 <>
//                   <Card.Text>
//                     <strong>Your Ride:</strong> You're the driver for this ride.
//                   </Card.Text>
//                   <Button variant='secondary' className='w-100'>
//                     Manage Ride
//                   </Button>
//                   <Button variant='danger' className='w-100 mt-2'>
//                     Cancel Ride
//                   </Button>
//                 </>
//               )}
//             </Col>

//             <Col md={6}>
//               <RideMapView
//                 startLocation={ride.startLocation}
//                 endLocation={ride.endLocation}
//               />
//             </Col>
//           </Row>

//           <div className='text-center mt-4'>
//             <span
//               style={{
//                 color: ride.availableSeats > 0 ? 'green' : 'red',
//                 fontWeight: 'bold',
//                 fontSize: '1.2em',
//               }}
//             >
//               {ride.availableSeats > 0 ? 'Seats Available ' : 'Fully Booked'}
//             </span>
//           </div>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default RideInfo;

// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { Card, Spinner, Row, Col, Button } from 'react-bootstrap';
// // import { getRideDetails } from '../api/rideApi.js';
// // import { getUserProfile } from '../api/userApi'; // Import getUserProfile from userApi
// // import RideMapView from '../components/RideMap/RideMapView'; // Import the map view component

// // const RideInfo = () => {
// //   const { id } = useParams(); // Get the ride ID from the URL
// //   const [ride, setRide] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [currentUser, setCurrentUser] = useState(null); // To store current user details

// //   useEffect(() => {
// //     const fetchRideDetails = async () => {
// //       try {
// //         const rideData = await getRideDetails(id);
// //         setRide(rideData);
// //       } catch (error) {
// //         console.error('Error fetching ride details:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     const fetchUserProfile = async () => {
// //       try {
// //         const userProfile = await getUserProfile(localStorage.getItem('token')); // Assuming token is saved in localStorage
// //         setCurrentUser(userProfile);
// //       } catch (error) {
// //         console.error('Error fetching user profile:', error);
// //       }
// //     };

// //     fetchRideDetails();
// //     fetchUserProfile();
// //   }, [id]);

// //   const calculateFare = (ride) => {
// //     const totalFare = ride.price; // Total fare for the ride
// //     const availableSeats = ride.availableSeats;
// //     const totalPeople = availableSeats + 1; // Total people (driver + passengers)

// //     // Base cost per passenger
// //     const baseFarePerPassenger = totalFare / totalPeople;

// //     // Driver's share (smaller share, since they're the ride creator)
// //     const driverShare = baseFarePerPassenger * 0.7; // The driver pays 70% of the base fare

// //     // Passengers' share (remainder of the total fare)
// //     const passengerFare = baseFarePerPassenger * 1.3; // Passengers pay the remaining 30%

// //     // Optional: CO2 savings (as a discount)
// //     const distance = ride.distance || 0; // Distance in kilometers (from ride details)
// //     const co2PerKm = 0.2; // Approximate CO2 emitted per km per passenger in kg
// //     const totalPassengers = ride.passengers.length + 1; // Driver + passengers

// //     // Calculate CO2 savings: If there were separate cars for each passenger, how much CO2 would be saved by carpooling?
// //     const co2Savings = distance * co2PerKm * totalPassengers; // Total CO2 saved
// //     const co2Discount = co2Savings > 0 ? co2Savings * 5 : 0; // CO2 savings discount (e.g., 5 INR per kg of CO2 saved)

// //     // Adjust the passenger fare based on the CO2 savings
// //     const adjustedPassengerFare = passengerFare - co2Discount;

// //     // Return the breakdown of fares and CO2 savings
// //     return {
// //       driverShare,
// //       passengerFare: adjustedPassengerFare,
// //       totalFare,
// //       co2Savings, // Total CO2 savings in kg
// //       adjustedPassengerFare,
// //     };
// //   };

// //   if (loading) {
// //     return (
// //       <div
// //         className='d-flex justify-content-center align-items-center'
// //         style={{ height: '100vh' }}
// //       >
// //         <Spinner animation='border' role='status'>
// //           <span className='visually-hidden'>Loading...</span>
// //         </Spinner>
// //       </div>
// //     );
// //   }

// //   if (!ride) {
// //     return <div className='text-center'>Ride not found</div>;
// //   }

// //   const {
// //     driverShare,
// //     passengerFare,
// //     totalFare,
// //     co2Savings,
// //     adjustedPassengerFare,
// //   } = calculateFare(ride);

// //   // Check if the current user is the driver
// //   const isDriver = currentUser?._id === ride.driver._id;

// //   return (
// //     <div className='container my-5'>
// //       <Card className='shadow-sm rounded'>
// //         <Card.Body>
// //           <Row>
// //             <Col md={6}>
// //               <Card.Title className='text-center mb-3'>
// //                 <strong>Ride Details</strong>
// //               </Card.Title>
// //               <Card.Subtitle className='mb-2 text-muted text-center'>
// //                 <strong>Driver:</strong> {ride.driver.name} <br />
// //                 <small>({ride.driver.email})</small>
// //               </Card.Subtitle>
// //               <Card.Text>
// //                 <strong>Price (Total):</strong> ₹{totalFare.toFixed(2)}
// //               </Card.Text>
// //               <Card.Text>
// //                 <strong>Driver's Share:</strong> ₹{driverShare.toFixed(2)}
// //               </Card.Text>

// //               <Card.Text>
// //                 <strong>Passenger Fare:</strong> ₹
// //                 {adjustedPassengerFare.toFixed(2)}{' '}
// //                 {co2Savings > 0 && (
// //                   <span className='text-success'>
// //                     (CO2 Savings Discount: ₹{(co2Savings * 5).toFixed(2)})
// //                   </span>
// //                 )}
// //               </Card.Text>
// //               <Card.Text>
// //                 <strong>Available Seats:</strong> {ride.availableSeats}
// //               </Card.Text>
// //               <Card.Text>
// //                 <strong>Ride Date:</strong>{' '}
// //                 {new Date(ride.rideDate).toLocaleDateString()}
// //               </Card.Text>

// //               <Card.Text>
// //                 <strong>Passengers:</strong>{' '}
// //                 {ride.passengers.length > 0
// //                   ? ride.passengers.join(', ')
// //                   : 'None'}
// //               </Card.Text>

// //               {/* Show "Join Ride" button only if the current user is not the driver */}
// //               {!isDriver && (
// //                 <Button
// //                   variant='primary'
// //                   className='w-100'
// //                   disabled={ride.availableSeats <= 0}
// //                   style={{
// //                     backgroundColor:
// //                       ride.availableSeats > 0 ? '#28a745' : '#dc3545',
// //                   }}
// //                 >
// //                   {ride.availableSeats > 0 ? 'Join Ride' : 'Fully Booked'}
// //                 </Button>
// //               )}
// //             </Col>

// //             <Col md={6}>
// //               <RideMapView
// //                 startLocation={ride.startLocation}
// //                 endLocation={ride.endLocation}
// //               />
// //             </Col>
// //           </Row>

// //           <div className='text-center mt-4'>
// //             <span
// //               style={{
// //                 color: ride.availableSeats > 0 ? 'green' : 'red',
// //                 fontWeight: 'bold',
// //                 fontSize: '1.2em',
// //               }}
// //             >
// //               {ride.availableSeats > 0 ? 'Seats Available ' : 'Fully Booked'}
// //             </span>
// //           </div>
// //         </Card.Body>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default RideInfo;

// // // import React, { useEffect, useState } from 'react';
// // // import { useParams } from 'react-router-dom';
// // // import { Card, Spinner, Row, Col, Button } from 'react-bootstrap';
// // // import { getRideDetails } from '../api/rideApi.js';
// // // import RideMapView from '../components/RideMap/RideMapView'; // Import the map view component

// // // const RideInfo = () => {
// // //   const { id } = useParams(); // Get the ride ID from the URL
// // //   const [ride, setRide] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchRideDetails = async () => {
// // //       try {
// // //         const rideData = await getRideDetails(id);
// // //         setRide(rideData);
// // //       } catch (error) {
// // //         console.error('Error fetching ride details:', error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchRideDetails();
// // //   }, [id]);

// // //   //   const calculateFare = (ride) => {
// // //   //     const totalFare = ride.price; // Total fare for the ride
// // //   //     const availableSeats = ride.availableSeats;
// // //   //     const totalPeople = availableSeats + 1; // Total people (driver + passengers)

// // //   //     // Base cost per passenger
// // //   //     const baseFarePerPassenger = totalFare / totalPeople;

// // //   //     // Driver's share (smaller share, since they're the ride creator)
// // //   //     const driverShare = baseFarePerPassenger * 0.7; // The driver pays 70% of the base fare

// // //   //     // Passengers' share (remainder of the total fare)
// // //   //     const passengerFare = baseFarePerPassenger * 1.3; // Passengers pay the remaining 30%

// // //   //     // Optional: CO2 savings (as a discount)
// // //   //     const co2Savings = ride.co2Savings || 0;
// // //   //     const co2Discount = co2Savings > 0 ? co2Savings * 5 : 0; // e.g., 5 INR per kg of CO2 saved

// // //   //     // Adjust the passenger fare based on the CO2 savings
// // //   //     const adjustedPassengerFare = passengerFare - co2Discount;

// // //   //     // Return the breakdown of fares
// // //   //     return {
// // //   //       driverShare,
// // //   //       passengerFare: adjustedPassengerFare,
// // //   //       totalFare,
// // //   //       co2Savings,
// // //   //       adjustedPassengerFare,
// // //   //     };
// // //   //   };
// // //   const calculateFare = (ride) => {
// // //     const totalFare = ride.price; // Total fare for the ride
// // //     const availableSeats = ride.availableSeats;
// // //     const totalPeople = availableSeats + 1; // Total people (driver + passengers)

// // //     // Base cost per passenger
// // //     const baseFarePerPassenger = totalFare / totalPeople;

// // //     // Driver's share (smaller share, since they're the ride creator)
// // //     const driverShare = baseFarePerPassenger * 0.7; // The driver pays 70% of the base fare

// // //     // Passengers' share (remainder of the total fare)
// // //     const passengerFare = baseFarePerPassenger * 1.3; // Passengers pay the remaining 30%

// // //     // Optional: CO2 savings (as a discount)
// // //     const distance = ride.distance || 0; // Distance in kilometers (from ride details)
// // //     const co2PerKm = 0.2; // Approximate CO2 emitted per km per passenger in kg
// // //     const totalPassengers = ride.passengers.length + 1; // Driver + passengers

// // //     // Calculate CO2 savings: If there were separate cars for each passenger, how much CO2 would be saved by carpooling?
// // //     const co2Savings = distance * co2PerKm * totalPassengers; // Total CO2 saved
// // //     const co2Discount = co2Savings > 0 ? co2Savings * 5 : 0; // CO2 savings discount (e.g., 5 INR per kg of CO2 saved)

// // //     // Adjust the passenger fare based on the CO2 savings
// // //     const adjustedPassengerFare = passengerFare - co2Discount;

// // //     // Return the breakdown of fares and CO2 savings
// // //     return {
// // //       driverShare,
// // //       passengerFare: adjustedPassengerFare,
// // //       totalFare,
// // //       co2Savings, // Total CO2 savings in kg
// // //       adjustedPassengerFare,
// // //     };
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div
// // //         className='d-flex justify-content-center align-items-center'
// // //         style={{ height: '100vh' }}
// // //       >
// // //         <Spinner animation='border' role='status'>
// // //           <span className='visually-hidden'>Loading...</span>
// // //         </Spinner>
// // //       </div>
// // //     );
// // //   }

// // //   if (!ride) {
// // //     return <div className='text-center'>Ride not found</div>;
// // //   }

// // //   const {
// // //     driverShare,
// // //     passengerFare,
// // //     totalFare,
// // //     co2Savings,
// // //     adjustedPassengerFare,
// // //   } = calculateFare(ride);

// // //   return (
// // //     <div className='container my-5'>
// // //       <Card className='shadow-sm rounded'>
// // //         <Card.Body>
// // //           <Row>
// // //             <Col md={6}>
// // //               <Card.Title className='text-center mb-3'>
// // //                 <strong>Ride Details</strong>
// // //               </Card.Title>
// // //               <Card.Subtitle className='mb-2 text-muted text-center'>
// // //                 <strong>Driver:</strong> {ride.driver.name} <br />
// // //                 <small>({ride.driver.email})</small>
// // //               </Card.Subtitle>
// // //               <Card.Text>
// // //                 <strong>Price (Total):</strong> ₹{totalFare.toFixed(2)}
// // //               </Card.Text>
// // //               <Card.Text>
// // //                 <strong>Driver's Share:</strong> ₹{driverShare.toFixed(2)}
// // //               </Card.Text>

// // //               <Card.Text>
// // //                 <strong>Passenger Fare:</strong> ₹
// // //                 {adjustedPassengerFare.toFixed(2)}{' '}
// // //                 {co2Savings > 0 && (
// // //                   <span className='text-success'>
// // //                     (CO2 Savings Discount: ₹{(co2Savings * 5).toFixed(2)})
// // //                   </span>
// // //                 )}
// // //               </Card.Text>
// // //               <Card.Text>
// // //                 <strong>Available Seats:</strong> {ride.availableSeats}
// // //               </Card.Text>
// // //               <Card.Text>
// // //                 <strong>Ride Date:</strong>{' '}
// // //                 {new Date(ride.rideDate).toLocaleDateString()}
// // //               </Card.Text>

// // //               <Card.Text>
// // //                 <strong>Passengers:</strong>{' '}
// // //                 {ride.passengers.length > 0
// // //                   ? ride.passengers.join(', ')
// // //                   : 'None'}
// // //               </Card.Text>
// // //               <Button
// // //                 variant='primary'
// // //                 className='w-100'
// // //                 disabled={ride.availableSeats <= 0}
// // //                 style={{
// // //                   backgroundColor:
// // //                     ride.availableSeats > 0 ? '#28a745' : '#dc3545',
// // //                 }}
// // //               >
// // //                 {ride.availableSeats > 0 ? 'Join Ride' : 'Fully Booked'}
// // //               </Button>
// // //             </Col>

// // //             <Col md={6}>
// // //               <RideMapView
// // //                 startLocation={ride.startLocation}
// // //                 endLocation={ride.endLocation}
// // //               />
// // //             </Col>
// // //           </Row>

// // //           <div className='text-center mt-4'>
// // //             <span
// // //               style={{
// // //                 color: ride.availableSeats > 0 ? 'green' : 'red',
// // //                 fontWeight: 'bold',
// // //                 fontSize: '1.2em',
// // //               }}
// // //             >
// // //               {ride.availableSeats > 0 ? 'Seats Available ' : 'Fully Booked'}
// // //             </span>
// // //           </div>
// // //         </Card.Body>
// // //       </Card>
// // //     </div>
// // //   );
// // // };

// // // export default RideInfo;
