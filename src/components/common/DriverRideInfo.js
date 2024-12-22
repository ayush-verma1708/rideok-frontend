import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid2,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import UpdateRide from '../ridesAndDetails/UpdateRide'; // Make sure the correct path is used for your UpdateRide component
import DeleteRide from '../ridesAndDetails/DeleteRide';
import PassengerRideInfo from '../ridesAndDetails/PassengerRide';

const DriverRideInfo = ({ ride, onStartRide, onEndRide }) => {
  const [isManagingRide, setIsManagingRide] = useState(false); // State to toggle Manage Ride form

  const handleManageRideClick = () => {
    setIsManagingRide(!isManagingRide); // Toggle the visibility of UpdateRide component
  };

  return (
    <Card
      sx={{ boxShadow: 3, borderRadius: 2, maxWidth: 500, margin: '20px auto' }}
    >
      <CardContent>
        <Typography variant='h6' align='center' gutterBottom>
          <strong>Your Ride</strong>
        </Typography>

        <Grid2 container spacing={2}>
          {/* Ride Info */}
          <Grid2 item xs={12}>
            <Typography variant='body1' align='center'>
              <strong>You're the driver for this ride.</strong>
            </Typography>
          </Grid2>

          {/* Manage Ride Button */}
          <Grid2 item xs={12}>
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
          </Grid2>

          {/* Start/End Ride Buttons */}
          {ride.rideStatus === 'Scheduled' && (
            <Grid2 item xs={12}>
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
            </Grid2>
          )}
          {ride.rideStatus === 'In Progress' && (
            <Grid2 item xs={12}>
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
            </Grid2>
          )}

          {/* View Passengers */}
          <Grid2 item xs={12}>
            <PassengerRideInfo rideId={ride._id} />
          </Grid2>

          {/* Cancel Ride */}
          <Grid2 item xs={12}>
            <DeleteRide rideId={ride._id} />
          </Grid2>
        </Grid2>

        {/* Passengers List */}
        <Typography variant='body1' sx={{ marginTop: 3, fontWeight: 'bold' }}>
          Passengers:
        </Typography>
        <List>
          {ride.passengers.length > 0 ? (
            ride.passengers.map((passenger, index) => (
              <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
                <ListItemText primary={passenger} />
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

// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid2,
//   List,
//   ListItem,
//   ListItemText,
// } from '@mui/material';
// import UpdateRide from '../ridesAndDetails/UpdateRide'; // Make sure the correct path is used for your UpdateRide component

// const DriverRideInfo = ({
//   ride,
//   onManageRide,
//   onCancelRide,
//   onStartRide,
//   onEndRide,
//   onViewPassengers,
// }) => {
//   const [isManagingRide, setIsManagingRide] = useState(false); // State to toggle Manage Ride form

//   const handleManageRideClick = () => {
//     setIsManagingRide(true); // Show UpdateRide component
//   };

//   return (
//     <Card
//       sx={{ boxShadow: 3, borderRadius: 2, maxWidth: 500, margin: '20px auto' }}
//     >
//       <CardContent>
//         <Typography variant='h6' align='center' gutterBottom>
//           <strong>Your Ride</strong>
//         </Typography>

//         <Grid2 container spacing={2}>
//           {/* Ride Info */}
//           <Grid2 item xs={12}>
//             <Typography variant='body1' align='center'>
//               <strong>You're the driver for this ride.</strong>
//             </Typography>
//           </Grid2>

//           {/* Manage Ride Button */}
//           <Grid2 item xs={12}>
//             <Button
//               variant='contained'
//               fullWidth
//               onClick={handleManageRideClick}
//               sx={{
//                 backgroundColor: '#007bff',
//                 '&:hover': { backgroundColor: '#0056b3' },
//               }}
//             >
//               Manage Ride
//             </Button>
//           </Grid2>

//           {/* Start/End Ride Buttons */}
//           {ride.rideStatus === 'Scheduled' && (
//             <Grid2 item xs={12}>
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
//             </Grid2>
//           )}
//           {ride.rideStatus === 'In Progress' && (
//             <Grid2 item xs={12}>
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
//             </Grid2>
//           )}

//           {/* View Passengers */}
//           <Grid2 item xs={12}>
//             <Button
//               variant='outlined'
//               fullWidth
//               onClick={onViewPassengers}
//               sx={{
//                 borderColor: '#17a2b8',
//                 color: '#17a2b8',
//                 '&:hover': { backgroundColor: '#17a2b8', color: 'white' },
//               }}
//             >
//               View Passengers
//             </Button>
//           </Grid2>

//           {/* Cancel Ride */}
//           <Grid2 item xs={12}>
//             <Button
//               variant='contained'
//               fullWidth
//               onClick={onCancelRide}
//               sx={{
//                 backgroundColor: '#dc3545',
//                 '&:hover': { backgroundColor: '#c82333' },
//               }}
//             >
//               Cancel Ride
//             </Button>
//           </Grid2>
//         </Grid2>

//         {/* Passengers List */}
//         <Typography variant='body1' sx={{ marginTop: 3, fontWeight: 'bold' }}>
//           Passengers:
//         </Typography>
//         <List>
//           {ride.passengers.length > 0 ? (
//             ride.passengers.map((passenger, index) => (
//               <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
//                 <ListItemText primary={passenger} />
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

// import React from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid2,
//   List,
//   ListItem,
//   ListItemText,
// } from '@mui/material';

// const DriverRideInfo = ({
//   ride,
//   onManageRide,
//   onCancelRide,
//   onStartRide,
//   onEndRide,
//   onViewPassengers,
// }) => {
//   return (
//     <Card
//       sx={{ boxShadow: 3, borderRadius: 2, maxWidth: 500, margin: '20px auto' }}
//     >
//       <CardContent>
//         <Typography variant='h6' align='center' gutterBottom>
//           <strong>Your Ride</strong>
//         </Typography>

//         <Grid2 container spacing={2}>
//           {/* Ride Info */}
//           <Grid2 item xs={12}>
//             <Typography variant='body1' align='center'>
//               <strong>You're the driver for this ride.</strong>
//             </Typography>
//           </Grid2>

//           {/* Manage Ride Button */}
//           <Grid2 item xs={12}>
//             <Button
//               variant='contained'
//               fullWidth
//               onClick={onManageRide}
//               sx={{
//                 backgroundColor: '#007bff',
//                 '&:hover': { backgroundColor: '#0056b3' },
//               }}
//             >
//               Manage Ride
//             </Button>
//           </Grid2>

//           {/* Start/End Ride Buttons */}
//           {ride.rideStatus === 'Scheduled' && (
//             <Grid2 item xs={12}>
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
//             </Grid2>
//           )}
//           {ride.rideStatus === 'In Progress' && (
//             <Grid2 item xs={12}>
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
//             </Grid2>
//           )}

//           {/* View Passengers */}
//           <Grid2 item xs={12}>
//             <Button
//               variant='outlined'
//               fullWidth
//               onClick={onViewPassengers}
//               sx={{
//                 borderColor: '#17a2b8',
//                 color: '#17a2b8',
//                 '&:hover': { backgroundColor: '#17a2b8', color: 'white' },
//               }}
//             >
//               View Passengers
//             </Button>
//           </Grid2>

//           {/* Cancel Ride */}
//           <Grid2 item xs={12}>
//             <Button
//               variant='contained'
//               fullWidth
//               onClick={onCancelRide}
//               sx={{
//                 backgroundColor: '#dc3545',
//                 '&:hover': { backgroundColor: '#c82333' },
//               }}
//             >
//               Cancel Ride
//             </Button>
//           </Grid2>
//         </Grid2>

//         {/* Passengers List */}
//         <Typography variant='body1' sx={{ marginTop: 3, fontWeight: 'bold' }}>
//           Passengers:
//         </Typography>
//         <List>
//           {ride.passengers.length > 0 ? (
//             ride.passengers.map((passenger, index) => (
//               <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
//                 <ListItemText primary={passenger} />
//               </ListItem>
//             ))
//           ) : (
//             <ListItem>
//               <ListItemText primary='No passengers yet' />
//             </ListItem>
//           )}
//         </List>
//       </CardContent>
//     </Card>
//   );
// };

// export default DriverRideInfo;

// // import React from 'react';
// // import { Card, Button, ListGroup, Col, Row } from 'react-bootstrap';

// // const DriverRideInfo = ({
// //   ride,
// //   onManageRide,
// //   onCancelRide,
// //   onStartRide,
// //   onEndRide,
// //   onViewPassengers,
// // }) => {
// //   return (
// //     <Card className='shadow-sm rounded p-4'>
// //       <Card.Body>
// //         <Card.Title className='text-center mb-4'>
// //           <strong>Your Ride</strong>
// //         </Card.Title>

// //         {/* Ride Info Section */}
// //         <Row className='mb-3'>
// //           <Col>
// //             <Card.Text className='text-center'>
// //               <strong>You're the driver for this ride.</strong>
// //             </Card.Text>
// //           </Col>
// //         </Row>

// //         {/* Manage Ride */}
// //         <Button
// //           variant='primary'
// //           className='w-100 mb-2'
// //           onClick={onManageRide}
// //           style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
// //         >
// //           Manage Ride
// //         </Button>

// //         {/* Start/End Ride Buttons */}
// //         {ride.rideStatus === 'Scheduled' && (
// //           <Button
// //             variant='success'
// //             className='w-100 mb-2'
// //             onClick={onStartRide}
// //             style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
// //           >
// //             Start Ride
// //           </Button>
// //         )}

// //         {ride.rideStatus === 'In Progress' && (
// //           <Button
// //             variant='warning'
// //             className='w-100 mb-2'
// //             onClick={onEndRide}
// //             style={{ backgroundColor: '#ffc107', borderColor: '#ffc107' }}
// //           >
// //             End Ride
// //           </Button>
// //         )}

// //         {/* View Passengers */}
// //         <Button
// //           variant='info'
// //           className='w-100 mb-2'
// //           onClick={onViewPassengers}
// //           style={{ backgroundColor: '#17a2b8', borderColor: '#17a2b8' }}
// //         >
// //           View Passengers
// //         </Button>

// //         {/* Cancel Ride */}
// //         <Button
// //           variant='danger'
// //           className='w-100 mb-2'
// //           onClick={onCancelRide}
// //           style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
// //         >
// //           Cancel Ride
// //         </Button>

// //         {/* Passengers List */}
// //         <Card.Text className='mt-3'>
// //           <strong>Passengers:</strong>
// //         </Card.Text>
// //         <ListGroup>
// //           {ride.passengers.length > 0 ? (
// //             ride.passengers.map((passenger, index) => (
// //               <ListGroup.Item key={index}>{passenger}</ListGroup.Item>
// //             ))
// //           ) : (
// //             <ListGroup.Item>No passengers yet</ListGroup.Item>
// //           )}
// //         </ListGroup>
// //       </Card.Body>
// //     </Card>
// //   );
// // };

// // export default DriverRideInfo;

// // // // import React from 'react';
// // // // import { Card, Button, ListGroup } from 'react-bootstrap';

// // // // const DriverRideInfo = ({
// // // //   ride,
// // // //   onManageRide,
// // // //   onCancelRide,
// // // //   onStartRide,
// // // //   onEndRide,
// // // //   onViewPassengers,
// // // // }) => {
// // // //   return (
// // // //     <>
// // // //       <Card.Text>
// // // //         <strong>Your Ride:</strong> You're the driver for this ride.
// // // //       </Card.Text>

// // // //       {/* Manage Ride */}
// // // //       <Button variant='secondary' className='w-100' onClick={onManageRide}>
// // // //         Manage Ride
// // // //       </Button>

// // // //       {/* Start/End Ride */}
// // // //       {ride.rideStatus === 'Scheduled' && (
// // // //         <Button variant='primary' className='w-100 mt-2' onClick={onStartRide}>
// // // //           Start Ride
// // // //         </Button>
// // // //       )}

// // // //       {ride.rideStatus === 'In Progress' && (
// // // //         <Button variant='success' className='w-100 mt-2' onClick={onEndRide}>
// // // //           End Ride
// // // //         </Button>
// // // //       )}

// // // //       {/* View Passengers */}
// // // //       <Button variant='info' className='w-100 mt-2' onClick={onViewPassengers}>
// // // //         View Passengers
// // // //       </Button>

// // // //       {/* Cancel Ride */}
// // // //       <Button variant='danger' className='w-100 mt-2' onClick={onCancelRide}>
// // // //         Cancel Ride
// // // //       </Button>

// // // //       {/* Optional: List of passengers for better clarity */}
// // // //       <Card.Text className='mt-3'>
// // // //         <strong>Passengers:</strong>
// // // //       </Card.Text>
// // // //       <ListGroup>
// // // //         {ride.passengers.length > 0 ? (
// // // //           ride.passengers.map((passenger, index) => (
// // // //             <ListGroup.Item key={index}>{passenger}</ListGroup.Item>
// // // //           ))
// // // //         ) : (
// // // //           <ListGroup.Item>No passengers yet</ListGroup.Item>
// // // //         )}
// // // //       </ListGroup>
// // // //     </>
// // // //   );
// // // // };

// // // // export default DriverRideInfo;
