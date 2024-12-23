import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';
import UpdateRide from '../ridesAndDetails/UpdateRide';
import DeleteRide from '../ridesAndDetails/DeleteRide';
import PassengerRideInfo from '../ridesAndDetails/PassengerRide';
import { getUserById } from '../../api/userApi'; // Assuming this API is available

const DriverRideInfo = ({ ride, onStartRide, onEndRide }) => {
  const [isManagingRide, setIsManagingRide] = useState(false); // Toggle the UpdateRide form visibility
  const [passengerNames, setPassengerNames] = useState({}); // To store passenger names by userId
  const [loading, setLoading] = useState(false); // To manage loading state

  const handleManageRideClick = () => {
    setIsManagingRide(!isManagingRide); // Toggle the visibility of the update ride form
  };

  // Fetch passenger names in parallel using Promise.all
  useEffect(() => {
    const fetchPassengerNames = async () => {
      setLoading(true);
      try {
        // Create an array of promises to fetch user data for each passenger
        const promises = ride.passengers.map((passenger) =>
          getUserById(passenger.user).then((user) => ({
            userId: passenger.user,
            name: user.name,
          }))
        );

        // Wait for all promises to resolve
        const results = await Promise.all(promises);

        // Create a map of userId to name
        const names = results.reduce((acc, { userId, name }) => {
          acc[userId] = name;
          return acc;
        }, {});

        setPassengerNames(names); // Update the state with the fetched names
      } catch (error) {
        console.error('Error fetching passenger names:', error);
      } finally {
        setLoading(false);
      }
    };

    if (ride.passengers.length > 0) {
      fetchPassengerNames();
    }
  }, [ride.passengers]);

  return (
    <Card
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        maxWidth: 700,
        margin: '20px auto',
        padding: 3,
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography
          variant='h5'
          align='center'
          gutterBottom
          sx={{ fontWeight: 'bold', marginBottom: '16px' }}
        >
          Your Ride Details
        </Typography>

        {/* Driver Info */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Chip label="You're the Driver" color='primary' variant='filled' />
        </Box>

        {/* View Passengers Section */}
        <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f9f9f9' }}>
          <Typography variant='h6' sx={{ mb: 2 }}>
            Passenger Information
          </Typography>
          <PassengerRideInfo rideId={ride._id} />
        </Paper>

        {/* Ride Management Section */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* Manage Ride Button */}
          <Grid item xs={12} sm={6}>
            <Button
              variant='contained'
              fullWidth
              onClick={handleManageRideClick}
              sx={{
                backgroundColor: '#007bff',
                '&:hover': { backgroundColor: '#0056b3' },
              }}
            >
              {isManagingRide ? 'Cancel Edit' : 'Edit Ride'}
            </Button>
          </Grid>

          {/* Ride Status Actions */}
          {ride.rideStatus === 'Scheduled' && (
            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                fullWidth
                onClick={onStartRide}
                sx={{
                  backgroundColor: '#28a745',
                  '&:hover': { backgroundColor: '#218838' },
                }}
              >
                Start Ride
              </Button>
            </Grid>
          )}
          {ride.rideStatus === 'In Progress' && (
            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                fullWidth
                onClick={onEndRide}
                sx={{
                  backgroundColor: '#ffc107',
                  '&:hover': { backgroundColor: '#e0a800' },
                }}
              >
                End Ride
              </Button>
            </Grid>
          )}

          {/* Cancel Ride */}
          <Grid item xs={12} sm={6}>
            <DeleteRide rideId={ride._id} />
          </Grid>
        </Grid>

        {/* Passengers List */}
        <Typography variant='body1' sx={{ fontWeight: 'bold', mb: 1 }}>
          Passengers:
        </Typography>
        <List>
          {loading ? (
            <CircularProgress />
          ) : ride.passengers.length > 0 ? (
            ride.passengers.map((passenger, index) => (
              <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
                <ListItemText
                  primary={`User: ${
                    passengerNames[passenger.user] || 'No Name Found'
                  }, Location: ${passenger.location}`}
                  secondary={`Phone: ${passenger.phoneNumber}, Status: ${
                    passenger.approval ? 'Approved' : 'Pending'
                  }`}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary='No passengers yet' />
            </ListItem>
          )}
        </List>

        {/* Display UpdateRide component if managing ride */}
        {isManagingRide && <UpdateRide rideId={ride._id} />}
      </CardContent>
    </Card>
  );
};

export default DriverRideInfo;

// import React, { useEffect, useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   Box,
//   Paper,
//   Divider,
//   Chip,
//   CircularProgress,
// } from '@mui/material';
// import UpdateRide from '../ridesAndDetails/UpdateRide';
// import DeleteRide from '../ridesAndDetails/DeleteRide';
// import PassengerRideInfo from '../ridesAndDetails/PassengerRide';
// import { getUserById } from '../../api/userApi'; // Assuming this API is available

// const DriverRideInfo = ({ ride, onStartRide, onEndRide }) => {
//   const [isManagingRide, setIsManagingRide] = useState(false); // Toggle the UpdateRide form visibility
//   const [passengerNames, setPassengerNames] = useState({}); // To store passenger names by userId
//   const [loading, setLoading] = useState(false); // To manage loading state

//   const handleManageRideClick = () => {
//     setIsManagingRide(!isManagingRide); // Toggle the visibility of the update ride form
//   };

//   // Fetch passenger names
//   useEffect(() => {
//     const fetchPassengerNames = async () => {
//       setLoading(true);
//       try {
//         const names = {};
//         for (let passenger of ride.passengers) {
//           const user = await getUserById(passenger.userId); // Fetch user data by userId
//           names[passenger.userId] = user.name; // Store the name by userId
//         }
//         setPassengerNames(names);
//       } catch (error) {
//         console.error('Error fetching passenger names:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (ride.passengers.length > 0) {
//       fetchPassengerNames();
//     }
//   }, [ride.passengers]);

//   return (
//     <Card
//       sx={{
//         boxShadow: 3,
//         borderRadius: 2,
//         maxWidth: 700,
//         margin: '20px auto',
//         padding: 3,
//       }}
//     >
//       <CardContent>
//         {/* Title */}
//         <Typography
//           variant='h5'
//           align='center'
//           gutterBottom
//           sx={{ fontWeight: 'bold', marginBottom: '16px' }}
//         >
//           Your Ride Details
//         </Typography>

//         {/* Driver Info */}
//         <Box sx={{ mb: 3, textAlign: 'center' }}>
//           <Chip label="You're the Driver" color='primary' variant='filled' />
//         </Box>

//         {/* View Passengers Section */}
//         <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f9f9f9' }}>
//           <Typography variant='h6' sx={{ mb: 2 }}>
//             Passenger Information
//           </Typography>
//           <PassengerRideInfo rideId={ride._id} />
//         </Paper>

//         {/* Ride Management Section */}
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           {/* Manage Ride Button */}
//           <Grid item xs={12} sm={6}>
//             <Button
//               variant='contained'
//               fullWidth
//               onClick={handleManageRideClick}
//               sx={{
//                 backgroundColor: '#007bff',
//                 '&:hover': { backgroundColor: '#0056b3' },
//               }}
//             >
//               {isManagingRide ? 'Cancel Edit' : 'Edit Ride'}
//             </Button>
//           </Grid>

//           {/* Ride Status Actions */}
//           {ride.rideStatus === 'Scheduled' && (
//             <Grid item xs={12} sm={6}>
//               <Button
//                 variant='contained'
//                 fullWidth
//                 onClick={onStartRide}
//                 sx={{
//                   backgroundColor: '#28a745',
//                   '&:hover': { backgroundColor: '#218838' },
//                 }}
//               >
//                 Start Ride
//               </Button>
//             </Grid>
//           )}
//           {ride.rideStatus === 'In Progress' && (
//             <Grid item xs={12} sm={6}>
//               <Button
//                 variant='contained'
//                 fullWidth
//                 onClick={onEndRide}
//                 sx={{
//                   backgroundColor: '#ffc107',
//                   '&:hover': { backgroundColor: '#e0a800' },
//                 }}
//               >
//                 End Ride
//               </Button>
//             </Grid>
//           )}

//           {/* Cancel Ride */}
//           <Grid item xs={12} sm={6}>
//             <DeleteRide rideId={ride._id} />
//           </Grid>
//         </Grid>

//         {/* Passengers List */}
//         <Typography variant='body1' sx={{ fontWeight: 'bold', mb: 1 }}>
//           Passengers:
//         </Typography>
//         <List>
//           {loading ? (
//             <CircularProgress />
//           ) : ride.passengers.length > 0 ? (
//             ride.passengers.map((passenger, index) => (
//               <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
//                 <ListItemText
//                   primary={`User: ${
//                     passengerNames[passenger.userId] || 'Loading...'
//                   }, Location: ${passenger.location}`}
//                   secondary={`Phone: ${passenger.phoneNumber}, Approval: ${
//                     passenger.approval ? 'Approved' : 'Pending'
//                   }`}
//                 />
//               </ListItem>
//             ))
//           ) : (
//             <ListItem>
//               <ListItemText primary='No passengers yet' />
//             </ListItem>
//           )}
//         </List>

//         {/* Display UpdateRide component if managing ride */}
//         {isManagingRide && <UpdateRide rideId={ride._id} />}
//       </CardContent>
//     </Card>
//   );
// };

// export default DriverRideInfo;

// // import React, { useState } from 'react';
// // import {
// //   Card,
// //   CardContent,
// //   Typography,
// //   Button,
// //   Grid,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   Box,
// //   Paper,
// //   Divider,
// //   Chip,
// // } from '@mui/material';
// // import UpdateRide from '../ridesAndDetails/UpdateRide';
// // import DeleteRide from '../ridesAndDetails/DeleteRide';
// // import PassengerRideInfo from '../ridesAndDetails/PassengerRide';

// // const DriverRideInfo = ({ ride, onStartRide, onEndRide }) => {
// //   const [isManagingRide, setIsManagingRide] = useState(false); // Toggle the UpdateRide form visibility

// //   const handleManageRideClick = () => {
// //     setIsManagingRide(!isManagingRide); // Toggle the visibility of the update ride form
// //   };

// //   return (
// //     <Card
// //       sx={{
// //         boxShadow: 3,
// //         borderRadius: 2,
// //         maxWidth: 700,
// //         margin: '20px auto',
// //         padding: 3,
// //       }}
// //     >
// //       <CardContent>
// //         {/* Title */}
// //         <Typography
// //           variant='h5'
// //           align='center'
// //           gutterBottom
// //           sx={{ fontWeight: 'bold' }}
// //         >
// //           Your Ride Details
// //         </Typography>

// //         {/* Driver Info */}
// //         <Box sx={{ mb: 3, textAlign: 'center' }}>
// //           <Chip label="You're the Driver" color='primary' variant='filled' />
// //         </Box>

// //         {/* View Passengers Section */}
// //         <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f9f9f9' }}>
// //           <Typography variant='h6' sx={{ mb: 2 }}>
// //             Passenger Information
// //           </Typography>
// //           <PassengerRideInfo rideId={ride._id} />
// //         </Paper>

// //         {/* Ride Management Section */}
// //         <Grid container spacing={2} sx={{ mb: 3 }}>
// //           {/* Manage Ride Button */}
// //           <Grid item xs={12} sm={6}>
// //             <Button
// //               variant='contained'
// //               fullWidth
// //               onClick={handleManageRideClick}
// //               sx={{
// //                 backgroundColor: '#007bff',
// //                 '&:hover': { backgroundColor: '#0056b3' },
// //               }}
// //             >
// //               {isManagingRide ? 'Cancel Edit' : 'Edit Ride'}
// //             </Button>
// //           </Grid>

// //           {/* Ride Status Actions */}
// //           {ride.rideStatus === 'Scheduled' && (
// //             <Grid item xs={12} sm={6}>
// //               <Button
// //                 variant='contained'
// //                 fullWidth
// //                 onClick={onStartRide}
// //                 sx={{
// //                   backgroundColor: '#28a745',
// //                   '&:hover': { backgroundColor: '#218838' },
// //                 }}
// //               >
// //                 Start Ride
// //               </Button>
// //             </Grid>
// //           )}
// //           {ride.rideStatus === 'In Progress' && (
// //             <Grid item xs={12} sm={6}>
// //               <Button
// //                 variant='contained'
// //                 fullWidth
// //                 onClick={onEndRide}
// //                 sx={{
// //                   backgroundColor: '#ffc107',
// //                   '&:hover': { backgroundColor: '#e0a800' },
// //                 }}
// //               >
// //                 End Ride
// //               </Button>
// //             </Grid>
// //           )}

// //           {/* Cancel Ride */}
// //           <Grid item xs={12} sm={6}>
// //             <DeleteRide rideId={ride._id} />
// //           </Grid>
// //         </Grid>

// //         {/* Passengers List */}
// //         <Typography variant='body1' sx={{ fontWeight: 'bold', mb: 1 }}>
// //           Passengers:
// //         </Typography>
// //         <List>
// //           {ride.passengers.length > 0 ? (
// //             ride.passengers.map((passenger, index) => (
// //               <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
// //                 <ListItemText
// //                   primary={`User: ${passenger.user}, Location: ${passenger.location}`}
// //                   secondary={`Phone: ${passenger.phoneNumber}, Approval: ${
// //                     passenger.approval ? 'Approved' : 'Pending'
// //                   }`}
// //                 />
// //               </ListItem>
// //             ))
// //           ) : (
// //             <ListItem>
// //               <ListItemText primary='No passengers yet' />
// //             </ListItem>
// //           )}
// //         </List>

// //         {/* Display UpdateRide component if managing ride */}
// //         {isManagingRide && <UpdateRide rideId={ride._id} />}
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default DriverRideInfo;
