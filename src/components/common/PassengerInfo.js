import React from 'react';
import { Button, Card, CardContent, Typography, Grid2 } from '@mui/material';
import DisplayRideButton from './DisplayRideButton';

const sliceAfterCommas = (sentence) => {
  const parts = sentence.split(',');
  return parts.slice(0, 3).join(', ');
};

const PassengerRideInfo = ({ ride, passengerFare, co2Savings }) => {
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
          <Grid2 item xs={12}>
            <DisplayRideButton DisplayRideButton rideId={ride} />
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default PassengerRideInfo;

// import React from 'react';
// import { Card, CardContent, Typography, Grid2 } from '@mui/material';

// const sliceAfterCommas = (sentence) => {
//   // Split the sentence by commas and take the first 3 parts
//   const parts = sentence.split(',');
//   return parts.slice(0, 3).join(', ');
// };

// const PassengerRideInfo = ({ ride, passengerFare, co2Savings }) => {
//   return (
//     <Card
//       sx={{ boxShadow: 3, borderRadius: 2, maxWidth: 500, margin: '20px auto' }}
//     >
//       <CardContent>
//         <Typography variant='h6' align='center' gutterBottom>
//           <strong>Passenger Ride Info</strong>
//         </Typography>

//         <Grid2 container spacing={2}>
//           {/* Fare */}
//           <Grid2 item xs={12}>
//             <Typography variant='body1'>
//               <strong>Fare:</strong>{' '}
//               {passengerFare !== undefined ? (
//                 <span>{`${passengerFare.toFixed(2)} INR`}</span>
//               ) : (
//                 <span style={{ color: 'gray' }}>Fare not available</span>
//               )}
//             </Typography>
//           </Grid2>

//           {/* CO2 Savings */}
//           <Grid2 item xs={12}>
//             <Typography variant='body1'>
//               <strong>CO2 Savings:</strong>{' '}
//               {co2Savings !== undefined ? (
//                 <span>{`${co2Savings.toFixed(2)} kg`}</span>
//               ) : (
//                 <span style={{ color: 'gray' }}>
//                   CO2 savings not calculated
//                 </span>
//               )}
//             </Typography>
//           </Grid2>

//           {/* Route */}
//           <Grid2 item xs={12}>
//             <Card.Text>
//               <strong>From:</strong> {sliceAfterCommas(ride.startLocation)}
//             </Card.Text>
//             <Card.Text>
//               <strong>To:</strong> {sliceAfterCommas(ride.endLocation)}
//             </Card.Text>
//           </Grid2>
//         </Grid2>
//       </CardContent>
//     </Card>
//   );
// };

// export default PassengerRideInfo;

// // import React from 'react';
// // import { Card, CardContent, Typography, Grid2 } from '@mui/material';

// // const PassengerRideInfo = ({ ride, passengerFare, co2Savings }) => {
// //   return (
// //     <Card
// //       sx={{ boxShadow: 3, borderRadius: 2, maxWidth: 400, margin: '0 auto' }}
// //     >
// //       <CardContent>
// //         <Typography variant='h6' align='center' gutterBottom>
// //           <strong>Passenger Ride Info</strong>
// //         </Typography>

// //         <Grid2 container spacing={2}>
// //           {/* Fare */}
// //           <Grid2 item xs={12}>
// //             <Typography variant='body1'>
// //               <strong>Fare:</strong>{' '}
// //               {passengerFare !== undefined ? (
// //                 <span>{`${passengerFare.toFixed(2)} INR`}</span>
// //               ) : (
// //                 <span style={{ color: 'gray' }}>Fare not available</span>
// //               )}
// //             </Typography>
// //           </Grid2>

// //           {/* CO2 Savings */}
// //           <Grid2 item xs={12}>
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
// //           </Grid>

// //           {/* Route */}
// //           <Grid item xs={12}>
// //             <Typography variant='body1'>
// //               <strong>Route:</strong> {ride.startLocation} to {ride.endLocation}
// //             </Typography>
// //           </Grid>
// //         </Grid>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default PassengerRideInfo;

// // // import React from 'react';

// // // const PassengerRideInfo = ({ ride, passengerFare, co2Savings }) => {
// // //   return (
// // //     <div>
// // //       <p>
// // //         <strong>Fare:</strong>{' '}
// // //         {passengerFare !== undefined
// // //           ? `${passengerFare.toFixed(2)} INR`
// // //           : 'Fare not available'}
// // //       </p>
// // //       <p>
// // //         <strong>CO2 Savings:</strong>{' '}
// // //         {co2Savings !== undefined
// // //           ? `${co2Savings.toFixed(2)} kg`
// // //           : 'CO2 savings not calculated'}
// // //       </p>
// // //       <p>
// // //         <strong>Route:</strong> {ride.startLocation} to {ride.endLocation}
// // //       </p>
// // //     </div>
// // //   );
// // // };

// // // export default PassengerRideInfo;

// // // // import React from 'react';
// // // // import { Card, Button } from 'react-bootstrap';

// // // // const PassengerRideInfo = ({ ride, adjustedPassengerFare, co2Savings }) => {
// // // //   return (
// // // //     <>
// // // //       <Card.Text>
// // // //         <strong>Price (Total):</strong> ₹{ride.price.toFixed(2)}
// // // //       </Card.Text>
// // // //       <Card.Text>
// // // //         <strong>Passenger Fare:</strong> ₹{adjustedPassengerFare.toFixed(2)}{' '}
// // // //         {co2Savings > 0 && (
// // // //           <span className='text-success'>
// // // //             (CO2 Savings Discount: ₹{(co2Savings * 5).toFixed(2)})
// // // //           </span>
// // // //         )}
// // // //       </Card.Text>
// // // //       <Card.Text>
// // // //         <strong>Available Seats:</strong> {ride.availableSeats}
// // // //       </Card.Text>
// // // //       <Card.Text>
// // // //         <strong>Ride Date:</strong>{' '}
// // // //         {new Date(ride.rideDate).toLocaleDateString()}
// // // //       </Card.Text>
// // // //       <Card.Text>
// // // //         <strong>Passengers:</strong>{' '}
// // // //         {ride.passengers.length > 0 ? ride.passengers.join(', ') : 'None'}
// // // //       </Card.Text>

// // // //       <Button
// // // //         variant='primary'
// // // //         className='w-100'
// // // //         disabled={ride.availableSeats <= 0}
// // // //         style={{
// // // //           backgroundColor: ride.availableSeats > 0 ? '#28a745' : '#dc3545',
// // // //         }}
// // // //       >
// // // //         {ride.availableSeats > 0 ? 'Join Ride' : 'Fully Booked'}
// // // //       </Button>
// // // //     </>
// // // //   );
// // // // };

// // // // export default PassengerRideInfo;
