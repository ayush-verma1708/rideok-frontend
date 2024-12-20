import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Grid2 } from '@mui/material';
import DisplayRideButton from './DisplayRideButton';

const sliceAfterCommas = (sentence) => {
  const parts = sentence.split(',');
  return parts.slice(0, 3).join(', ');
};

const PassengerRideInfo = ({
  ride,
  currentUser,
  passengerFare,
  co2Savings,
}) => {
  const [userStatus, setUserStatus] = useState('not-participating');

  useEffect(() => {
    if (ride && currentUser) {
      // Check if the current user is the driver
      if (ride.driver && ride.driver._id === currentUser._id) {
        setUserStatus('driver');
        return;
      }

      // Check if the current user is in customerRequests
      const isCustomerRequested = ride.customerRequests.some(
        (request) => request.user === currentUser._id
      );
      if (isCustomerRequested) {
        setUserStatus('customer-requested');
        return;
      }

      // Check if the current user is in passengers
      const isPassenger = ride.passengers.some(
        (passenger) => passenger._id === currentUser._id
      );
      if (isPassenger) {
        setUserStatus('passenger');
        return;
      }

      // Default to "not-participating" if no match
      setUserStatus('not-participating');
    }
  }, [ride, currentUser]);

  return (
    <Card
      sx={{ boxShadow: 3, borderRadius: 2, maxWidth: 500, margin: '20px auto' }}
    >
      <CardContent>
        <Typography variant='h6' align='center' gutterBottom>
          <strong>Passenger Ride Info</strong>
        </Typography>

        <Grid2 container spacing={2}>
          {/* Fare */}
          <Grid2 item xs={12}>
            <Typography variant='body1'>
              <strong>Fare:</strong>{' '}
              {passengerFare !== undefined ? (
                <span>{`${passengerFare.toFixed(2)} INR`}</span>
              ) : (
                <span style={{ color: 'gray' }}>Fare not available</span>
              )}
            </Typography>
          </Grid2>

          {/* CO2 Savings */}
          <Grid2 item xs={12}>
            <Typography variant='body1'>
              <strong>CO2 Savings:</strong>{' '}
              {co2Savings !== undefined ? (
                <span>{`${co2Savings.toFixed(2)} kg`}</span>
              ) : (
                <span style={{ color: 'gray' }}>
                  CO2 savings not calculated
                </span>
              )}
            </Typography>
          </Grid2>

          {/* Route */}
          <Grid2 item xs={12}>
            <Typography variant='body1'>
              <strong>From:</strong> {sliceAfterCommas(ride.startLocation)}
            </Typography>
            <Typography variant='body1'>
              <strong>To:</strong> {sliceAfterCommas(ride.endLocation)}
            </Typography>
          </Grid2>

          {/* Status Message */}
          <Grid2 item xs={12}>
            {userStatus === 'driver' && (
              <Typography variant='body1' color='primary'>
                You are the driver for this ride.
              </Typography>
            )}
            {userStatus === 'customer-requested' && (
              <Typography variant='body1' color='primary'>
                You have requested to join this ride.
              </Typography>
            )}
            {userStatus === 'passenger' && (
              <Typography variant='body1' color='primary'>
                You are a passenger in this ride.
              </Typography>
            )}
            {userStatus === 'not-participating' && (
              <Typography variant='body1' color='gray'>
                You are not involved in this ride.
              </Typography>
            )}
          </Grid2>

          {/* DisplayRideButton */}
          <Grid2 item xs={12}>
            {userStatus !== 'customer-requested' && (
              <DisplayRideButton rideId={ride} />
            )}
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default PassengerRideInfo;

// import React, { useEffect, useState } from 'react';
// import { Button, Card, CardContent, Typography, Grid22 } from '@mui/material';
// import DisplayRideButton from './DisplayRideButton';

// const sliceAfterCommas = (sentence) => {
//   const parts = sentence.split(',');
//   return parts.slice(0, 3).join(', ');
// };

// const PassengerRideInfo = ({ ride, currentUser }) => {
//   const [userStatus, setUserStatus] = useState('not-participating');

//   useEffect(() => {
//     if (ride && currentUser) {
//       // Check if the current user is the driver
//       if (ride.driver && ride.driver._id === currentUser._id) {
//         setUserStatus('driver');
//         return;
//       }

//       // Check if the current user is in customerRequests
//       const isCustomerRequested = ride.customerRequests.some(
//         (request) => request.user === currentUser._id
//       );
//       if (isCustomerRequested) {
//         setUserStatus('customer-requested');
//         return;
//       }

//       // Check if the current user is in passengers
//       const isPassenger = ride.passengers.some(
//         (passenger) => passenger._id === currentUser._id
//       );
//       if (isPassenger) {
//         setUserStatus('passenger');
//         return;
//       }

//       // Default to "not-participating" if no match
//       setUserStatus('not-participating');
//     }
//   }, [ride, currentUser]);

//   return (
//           <Card
//             sx={{ boxShadow: 3, borderRadius: 2, maxWidth: 500, margin: '20px auto' }}
//           >
//             <CardContent>
//               <Typography variant='h6' align='center' gutterBottom>
//                 <strong>Passenger Ride Info</strong>
//               </Typography>

//               <Grid22 container spacing={2}>
//                 {/* Fare */}
//                 <Grid22 item xs={12}>
//                   <Typography variant='body1'>
//                     <strong>Fare:</strong>{' '}
//                     {passengerFare !== undefined ? (
//                       <span>{`${passengerFare.toFixed(2)} INR`}</span>
//                     ) : (
//                       <span style={{ color: 'gray' }}>Fare not available</span>
//                     )}
//                   </Typography>
//                 </Grid22>

//                 {/* CO2 Savings */}
//                 <Grid22 item xs={12}>
//                   <Typography variant='body1'>
//                     <strong>CO2 Savings:</strong>{' '}
//                     {co2Savings !== undefined ? (
//                       <span>{`${co2Savings.toFixed(2)} kg`}</span>
//                     ) : (
//                       <span style={{ color: 'gray' }}>
//                         CO2 savings not calculated
//                       </span>
//                     )}
//                   </Typography>
//                 </Grid22>

//                 {/* Route */}
//                 <Grid22 item xs={12}>
//                   <Typography variant='body1'>
//                     <strong>From:</strong> {sliceAfterCommas(ride.startLocation)}
//                   </Typography>
//                   <Typography variant='body1'>
//                     <strong>To:</strong> {sliceAfterCommas(ride.endLocation)}
//                   </Typography>
//                 </Grid22>
//                 <Grid22 item xs={12}>
//                   <DisplayRideButton DisplayRideButton rideId={ride} />
//                 </Grid22>
//               </Grid22>
//             </CardContent>
//           </Card>
//         );
//       };
//     <div>
//       {userStatus === 'driver' && <p>You are the driver for this ride.</p>}
//       {userStatus === 'customer-requested' && (
//         <p>You have requested to join this ride.</p>
//       )}
//       {userStatus === 'passenger' && <p>You are a passenger in this ride.</p>}
//       {userStatus === 'not-participating' && (
//         <p>You are not involved in this ride.</p>
//       )}

// export default PassengerRideInfo;

// // import React from 'react';
// // import { Button, Card, CardContent, Typography, Grid22 } from '@mui/material';
// // import DisplayRideButton from './DisplayRideButton';

// // const sliceAfterCommas = (sentence) => {
// //   const parts = sentence.split(',');
// //   return parts.slice(0, 3).join(', ');
// // };

// // const PassengerRideInfo = ({
// //   ride,
// //   passengerFare,
// //   co2Savings,
// //   currentUser,
// // }) => {
// //   return (
// //     <Card
// //       sx={{ boxShadow: 3, borderRadius: 2, maxWidth: 500, margin: '20px auto' }}
// //     >
// //       <CardContent>
// //         <Typography variant='h6' align='center' gutterBottom>
// //           <strong>Passenger Ride Info</strong>
// //         </Typography>

// //         <Grid22 container spacing={2}>
// //           {/* Fare */}
// //           <Grid22 item xs={12}>
// //             <Typography variant='body1'>
// //               <strong>Fare:</strong>{' '}
// //               {passengerFare !== undefined ? (
// //                 <span>{`${passengerFare.toFixed(2)} INR`}</span>
// //               ) : (
// //                 <span style={{ color: 'gray' }}>Fare not available</span>
// //               )}
// //             </Typography>
// //           </Grid22>

// //           {/* CO2 Savings */}
// //           <Grid22 item xs={12}>
// //             <Typography variant='body1'>
// //               <strong>CO2 Savings:</strong>{' '}
// //               {co2Savings !== undefined ? (
// //                 <span>{`${co2Savings.toFixed(2)} kg`}</span>
// //               ) : (
// //                 <span style={{ color: 'gray' }}>
// //                   CO2 savings not calculated
// //                 </span>
// //               )}
// //             </Typography>
// //           </Grid22>

// //           {/* Route */}
// //           <Grid22 item xs={12}>
// //             <Typography variant='body1'>
// //               <strong>From:</strong> {sliceAfterCommas(ride.startLocation)}
// //             </Typography>
// //             <Typography variant='body1'>
// //               <strong>To:</strong> {sliceAfterCommas(ride.endLocation)}
// //             </Typography>
// //           </Grid22>
// //           <Grid22 item xs={12}>
// //             <DisplayRideButton DisplayRideButton rideId={ride} />
// //           </Grid22>
// //         </Grid22>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default PassengerRideInfo;

// // // import React from 'react';
// // // import { Card, CardContent, Typography, Grid22 } from '@mui/material';

// // // const sliceAfterCommas = (sentence) => {
// // //   // Split the sentence by commas and take the first 3 parts
// // //   const parts = sentence.split(',');
// // //   return parts.slice(0, 3).join(', ');
// // // };

// // // const PassengerRideInfo = ({ ride, passengerFare, co2Savings }) => {
// // //   return (
// // //     <Card
// // //       sx={{ boxShadow: 3, borderRadius: 2, maxWidth: 500, margin: '20px auto' }}
// // //     >
// // //       <CardContent>
// // //         <Typography variant='h6' align='center' gutterBottom>
// // //           <strong>Passenger Ride Info</strong>
// // //         </Typography>

// // //         <Grid22 container spacing={2}>
// // //           {/* Fare */}
// // //           <Grid22 item xs={12}>
// // //             <Typography variant='body1'>
// // //               <strong>Fare:</strong>{' '}
// // //               {passengerFare !== undefined ? (
// // //                 <span>{`${passengerFare.toFixed(2)} INR`}</span>
// // //               ) : (
// // //                 <span style={{ color: 'gray' }}>Fare not available</span>
// // //               )}
// // //             </Typography>
// // //           </Grid22>

// // //           {/* CO2 Savings */}
// // //           <Grid22 item xs={12}>
// // //             <Typography variant='body1'>
// // //               <strong>CO2 Savings:</strong>{' '}
// // //               {co2Savings !== undefined ? (
// // //                 <span>{`${co2Savings.toFixed(2)} kg`}</span>
// // //               ) : (
// // //                 <span style={{ color: 'gray' }}>
// // //                   CO2 savings not calculated
// // //                 </span>
// // //               )}
// // //             </Typography>
// // //           </Grid22>

// // //           {/* Route */}
// // //           <Grid22 item xs={12}>
// // //             <Card.Text>
// // //               <strong>From:</strong> {sliceAfterCommas(ride.startLocation)}
// // //             </Card.Text>
// // //             <Card.Text>
// // //               <strong>To:</strong> {sliceAfterCommas(ride.endLocation)}
// // //             </Card.Text>
// // //           </Grid22>
// // //         </Grid22>
// // //       </CardContent>
// // //     </Card>
// // //   );
// // // };

// // // export default PassengerRideInfo;

// // // // import React from 'react';
// // // // import { Card, CardContent, Typography, Grid22 } from '@mui/material';

// // // // const PassengerRideInfo = ({ ride, passengerFare, co2Savings }) => {
// // // //   return (
// // // //     <Card
// // // //       sx={{ boxShadow: 3, borderRadius: 2, maxWidth: 400, margin: '0 auto' }}
// // // //     >
// // // //       <CardContent>
// // // //         <Typography variant='h6' align='center' gutterBottom>
// // // //           <strong>Passenger Ride Info</strong>
// // // //         </Typography>

// // // //         <Grid22 container spacing={2}>
// // // //           {/* Fare */}
// // // //           <Grid22 item xs={12}>
// // // //             <Typography variant='body1'>
// // // //               <strong>Fare:</strong>{' '}
// // // //               {passengerFare !== undefined ? (
// // // //                 <span>{`${passengerFare.toFixed(2)} INR`}</span>
// // // //               ) : (
// // // //                 <span style={{ color: 'gray' }}>Fare not available</span>
// // // //               )}
// // // //             </Typography>
// // // //           </Grid22>

// // // //           {/* CO2 Savings */}
// // // //           <Grid22 item xs={12}>
// // // //             <Typography variant='body1'>
// // // //               <strong>CO2 Savings:</strong>{' '}
// // // //               {co2Savings !== undefined ? (
// // // //                 <span>{`${co2Savings.toFixed(2)} kg`}</span>
// // // //               ) : (
// // // //                 <span style={{ color: 'gray' }}>
// // // //                   CO2 savings not calculated
// // // //                 </span>
// // // //               )}
// // // //             </Typography>
// // // //           </Grid2>

// // // //           {/* Route */}
// // // //           <Grid2 item xs={12}>
// // // //             <Typography variant='body1'>
// // // //               <strong>Route:</strong> {ride.startLocation} to {ride.endLocation}
// // // //             </Typography>
// // // //           </Grid2>
// // // //         </Grid2>
// // // //       </CardContent>
// // // //     </Card>
// // // //   );
// // // // };

// // // // export default PassengerRideInfo;

// // // // // import React from 'react';

// // // // // const PassengerRideInfo = ({ ride, passengerFare, co2Savings }) => {
// // // // //   return (
// // // // //     <div>
// // // // //       <p>
// // // // //         <strong>Fare:</strong>{' '}
// // // // //         {passengerFare !== undefined
// // // // //           ? `${passengerFare.toFixed(2)} INR`
// // // // //           : 'Fare not available'}
// // // // //       </p>
// // // // //       <p>
// // // // //         <strong>CO2 Savings:</strong>{' '}
// // // // //         {co2Savings !== undefined
// // // // //           ? `${co2Savings.toFixed(2)} kg`
// // // // //           : 'CO2 savings not calculated'}
// // // // //       </p>
// // // // //       <p>
// // // // //         <strong>Route:</strong> {ride.startLocation} to {ride.endLocation}
// // // // //       </p>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PassengerRideInfo;

// // // // // // import React from 'react';
// // // // // // import { Card, Button } from 'react-bootstrap';

// // // // // // const PassengerRideInfo = ({ ride, adjustedPassengerFare, co2Savings }) => {
// // // // // //   return (
// // // // // //     <>
// // // // // //       <Card.Text>
// // // // // //         <strong>Price (Total):</strong> ₹{ride.price.toFixed(2)}
// // // // // //       </Card.Text>
// // // // // //       <Card.Text>
// // // // // //         <strong>Passenger Fare:</strong> ₹{adjustedPassengerFare.toFixed(2)}{' '}
// // // // // //         {co2Savings > 0 && (
// // // // // //           <span className='text-success'>
// // // // // //             (CO2 Savings Discount: ₹{(co2Savings * 5).toFixed(2)})
// // // // // //           </span>
// // // // // //         )}
// // // // // //       </Card.Text>
// // // // // //       <Card.Text>
// // // // // //         <strong>Available Seats:</strong> {ride.availableSeats}
// // // // // //       </Card.Text>
// // // // // //       <Card.Text>
// // // // // //         <strong>Ride Date:</strong>{' '}
// // // // // //         {new Date(ride.rideDate).toLocaleDateString()}
// // // // // //       </Card.Text>
// // // // // //       <Card.Text>
// // // // // //         <strong>Passengers:</strong>{' '}
// // // // // //         {ride.passengers.length > 0 ? ride.passengers.join(', ') : 'None'}
// // // // // //       </Card.Text>

// // // // // //       <Button
// // // // // //         variant='primary'
// // // // // //         className='w-100'
// // // // // //         disabled={ride.availableSeats <= 0}
// // // // // //         style={{
// // // // // //           backgroundColor: ride.availableSeats > 0 ? '#28a745' : '#dc3545',
// // // // // //         }}
// // // // // //       >
// // // // // //         {ride.availableSeats > 0 ? 'Join Ride' : 'Fully Booked'}
// // // // // //       </Button>
// // // // // //     </>
// // // // // //   );
// // // // // // };

// // // // // // export default PassengerRideInfo;
