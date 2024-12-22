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

          {/* DisplayRideButton or Login Button */}
          <Grid2 item xs={12}>
            {currentUser ? (
              userStatus !== 'customer-requested' ? (
                <DisplayRideButton rideId={ride} />
              ) : (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => (window.location.href = '/onboarding')}
                >
                  Join Ride
                </Button>
              )
            ) : (
              <Button
                variant='contained'
                color='secondary'
                onClick={() => (window.location.href = '/onboarding')}
              >
                Login
              </Button>
            )}
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default PassengerRideInfo;

// import React, { useEffect, useState } from 'react';
// import { Button, Card, CardContent, Typography, Grid2 } from '@mui/material';
// import DisplayRideButton from './DisplayRideButton';

// const sliceAfterCommas = (sentence) => {
//   const parts = sentence.split(',');
//   return parts.slice(0, 3).join(', ');
// };

// const PassengerRideInfo = ({
//   ride,
//   currentUser,
//   passengerFare,
//   co2Savings,
// }) => {
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
//             <Typography variant='body1'>
//               <strong>From:</strong> {sliceAfterCommas(ride.startLocation)}
//             </Typography>
//             <Typography variant='body1'>
//               <strong>To:</strong> {sliceAfterCommas(ride.endLocation)}
//             </Typography>
//           </Grid2>

//           {/* Status Message */}
//           <Grid2 item xs={12}>
//             {userStatus === 'driver' && (
//               <Typography variant='body1' color='primary'>
//                 You are the driver for this ride.
//               </Typography>
//             )}
//             {userStatus === 'customer-requested' && (
//               <Typography variant='body1' color='primary'>
//                 You have requested to join this ride.
//               </Typography>
//             )}
//             {userStatus === 'passenger' && (
//               <Typography variant='body1' color='primary'>
//                 You are a passenger in this ride.
//               </Typography>
//             )}
//             {userStatus === 'not-participating' && (
//               <Typography variant='body1' color='gray'>
//                 You are not involved in this ride.
//               </Typography>
//             )}
//           </Grid2>

//           {/* DisplayRideButton */}
//           <Grid2 item xs={12}>
//             {userStatus !== 'customer-requested' ? (
//               <DisplayRideButton rideId={ride} />
//             ) : (
//               <Button
//                 variant='contained'
//                 color='primary'
//                 onClick={() => (window.location.href = '/onboarding')}
//               >
//                 Join Ride
//               </Button>
//             )}
//           </Grid2>
//         </Grid2>
//       </CardContent>
//     </Card>
//   );
// };

// export default PassengerRideInfo;
