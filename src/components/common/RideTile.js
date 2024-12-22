import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RideTile = ({
  ride,
  currentUser,
  onSelectRide,
  showDriver = true,
  showPassengers = true,
  showContactButton = false,
  onContactDriver,
}) => {
  const navigate = useNavigate();

  // const getUserStatus = () => {
  //   console.log('Ride passengers:', ride.passengers);
  //   console.log('Ride customerRequests:', ride.customerRequests);

  //   if (!currentUser) {
  //     console.log('User is not logged in.');
  //     return 'notLoggedIn';
  //   }

  //   // Ensure driver ID and current user ID are both strings before comparison
  //   if (ride.driver?._id === currentUser?._id) {
  //     console.log('User is the driver of this ride.');
  //     return 'driver';
  //   }

  //   // Check if the current user is a passenger
  //   const isPassenger = ride.passengers?.some((p) => {
  //     const match = p.user?._id === currentUser?._id;
  //     if (match) {
  //       console.log('User found as a passenger:', p);
  //     }
  //     return match;
  //   });

  //   if (isPassenger) return 'passenger';

  //   // Check if the current user has made a request for the ride
  //   const isRequested = ride.customerRequests?.some((req) => {
  //     const match = req.user?._id === currentUser?._id;

  //     if (match) {
  //       console.log('User has made a request for this ride:', req);
  //     }
  //     return match;
  //   });

  //   if (isRequested) return 'requested';

  //   console.log('User does not have any specific role in this ride.');
  //   return null;
  // };

  const getUserStatus = () => {
    if (!currentUser) {
      console.log('User is not logged in.');
      return 'notLoggedIn';
    }

    // Ensure driver ID and current user ID are both strings before comparison
    if (String(ride.driver?._id) === String(currentUser?._id)) {
      return 'driver';
    }

    // Check if the current user is a passenger
    const isPassenger = ride.passengers?.some((p) => {
      const match = String(p.user?._id) === String(currentUser?._id); // Ensure both IDs are strings
      if (match) {
      }
      return match;
    });

    if (isPassenger) return 'passenger';

    // Check if the current user has made a request for the ride
    const isRequested = ride.customerRequests?.some((req) => {
      const match = String(req.user) === String(currentUser?._id); // Ensure both IDs are strings

      if (match) {
      }
      return match;
    });

    if (isRequested) return 'requested';

    return null;
  };

  const userStatus = getUserStatus();

  const getRideStatus = () => {
    if (ride.isExpired) return { text: 'Expired', variant: 'secondary' };
    if (ride.availableSeats === 0)
      return { text: 'Fully Booked', variant: 'danger' };
    return { text: 'Available', variant: 'success' };
  };

  const { text: statusText, variant: statusVariant } = getRideStatus();

  const handleSelectRide = () => {
    if (onSelectRide) onSelectRide(ride._id);
    else navigate(`/ride/${ride._id}`);
  };

  return (
    <Card
      style={{
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        backgroundColor: ride.isExpired ? '#f8f9fa' : 'white',
        opacity: ride.isExpired ? 0.8 : 1,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <Card.Body>
        <Card.Title className='text-center'>
          Ride from <strong>{ride.startLocation || 'Unknown'}</strong> to{' '}
          <strong>{ride.endLocation || 'Unknown'}</strong>
        </Card.Title>
        <div className='text-center mb-3'>
          <Badge bg={statusVariant} style={{ fontSize: '1rem' }}>
            {statusText}
          </Badge>
        </div>
        {showDriver && (
          <Card.Text className='text-center'>
            <strong>Driver: </strong> {ride?.driver?.name || 'N/A'}
          </Card.Text>
        )}
        <Card.Text className='text-center'>
          <strong>Available Seats: </strong> {ride.availableSeats}
        </Card.Text>
        {userStatus === 'notLoggedIn' && (
          <p className='text-center text-danger'>
            Please <strong>log in</strong> to view more details and join this
            ride.
          </p>
        )}
        {userStatus === 'driver' && (
          <p className='text-center text-success'>You created this ride.</p>
        )}
        {userStatus === 'passenger' && (
          <p className='text-center text-primary'>
            You have confirmed a seat on this ride.
          </p>
        )}
        {userStatus === 'requested' && (
          <p className='text-center text-warning'>
            You have requested this ride. Please wait for the car owner to reach
            out to you.
          </p>
        )}
      </Card.Body>
      <Card.Footer className='text-center'>
        {userStatus === 'notLoggedIn' ? (
          <Button
            variant='primary'
            onClick={() => navigate('/login')}
            style={{ width: '100%' }}
          >
            Log In to Join Ride
          </Button>
        ) : (
          <Button
            variant='primary'
            onClick={handleSelectRide}
            style={{ width: '100%' }}
          >
            View Ride Details
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default RideTile;

// import React from 'react';
// import { Card, Button, Badge } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const RideTile = ({
//   ride,
//   currentUser,
//   onSelectRide,
//   showDriver = true,
//   showPassengers = true,
//   showContactButton = false,
//   onContactDriver,
// }) => {
//   const navigate = useNavigate();

//   // const getUserStatus = () => {
//   //   if (!currentUser) return 'notLoggedIn';
//   //   if (ride.driver?._id === currentUser?._id) return 'driver';
//   //   if (ride.passengers.some((p) => p.user?._id === currentUser?._id))
//   //     return 'passenger';
//   //   if (
//   //     ride.customerRequests?.some((req) => req.user?._id === currentUser?._id)
//   //   )
//   //     return 'requested';
//   //   return null;
//   // };
//   const getUserStatus = () => {
//     console.log('Checking user status...'); // Start of the function
//     console.log('Current User:', currentUser);
//     console.log('Ride Details:', ride);

//     if (!currentUser) {
//       console.log('User is not logged in.');
//       return 'notLoggedIn';
//     }

//     if (ride.driver?._id === currentUser?._id) {
//       console.log('User is the driver of this ride.');
//       return 'driver';
//     }

//     const isPassenger = ride.passengers.some((p) => {
//       const match = p.user?._id === currentUser?._id;
//       if (match) {
//         console.log('User found as a passenger:', p);
//       }
//       return match;
//     });
//     if (isPassenger) return 'passenger';

//     const isRequested = ride.customerRequests?.some((req) => {
//       const match = req.user?._id === currentUser?._id;
//       if (match) {
//         console.log('User has made a request for this ride:', req);
//       }
//       return match;
//     });
//     if (isRequested) return 'requested';

//     console.log('User does not have any specific role in this ride.');
//     return null;
//   };

//   const userStatus = getUserStatus();

//   const getRideStatus = () => {
//     if (ride.isExpired) return { text: 'Expired', variant: 'secondary' };
//     if (ride.availableSeats === 0)
//       return { text: 'Fully Booked', variant: 'danger' };
//     return { text: 'Available', variant: 'success' };
//   };

//   const { text: statusText, variant: statusVariant } = getRideStatus();

//   const handleSelectRide = () => {
//     if (onSelectRide) onSelectRide(ride._id);
//     else navigate(`/ride/${ride._id}`);
//   };

//   return (
//     <Card
//       style={{
//         borderRadius: '10px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         transition: 'transform 0.3s, box-shadow 0.3s',
//         backgroundColor: ride.isExpired ? '#f8f9fa' : 'white',
//         opacity: ride.isExpired ? 0.8 : 1,
//       }}
//       onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
//       onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//     >
//       <Card.Body>
//         <Card.Title className='text-center'>
//           Ride from <strong>{ride.startLocation || 'Unknown'}</strong> to{' '}
//           <strong>{ride.endLocation || 'Unknown'}</strong>
//         </Card.Title>
//         <div className='text-center mb-3'>
//           <Badge bg={statusVariant} style={{ fontSize: '1rem' }}>
//             {statusText}
//           </Badge>
//         </div>
//         {showDriver && (
//           <Card.Text className='text-center'>
//             <strong>Driver: </strong> {ride?.driver?.name || 'N/A'}
//           </Card.Text>
//         )}
//         <Card.Text className='text-center'>
//           <strong>Available Seats: </strong> {ride.availableSeats}
//         </Card.Text>
//         {userStatus === 'notLoggedIn' && (
//           <p className='text-center text-danger'>
//             Please <strong>log in</strong> to view more details and join this
//             ride.
//           </p>
//         )}
//         {userStatus === 'driver' && (
//           <p className='text-center text-success'>You created this ride.</p>
//         )}
//         {userStatus === 'passenger' && (
//           <p className='text-center text-primary'>
//             You have confirmed a seat on this ride.
//           </p>
//         )}
//         {userStatus === 'requested' && (
//           <p className='text-center text-warning'>
//             You have requested this ride. Please wait for the car owner to reach
//             out to you.
//           </p>
//         )}
//       </Card.Body>
//       <Card.Footer className='text-center'>
//         {userStatus === 'notLoggedIn' ? (
//           <Button
//             variant='primary'
//             onClick={() => navigate('/login')}
//             style={{ width: '100%' }}
//           >
//             Log In to Join Ride
//           </Button>
//         ) : (
//           <Button
//             variant='primary'
//             onClick={handleSelectRide}
//             style={{ width: '100%' }}
//           >
//             View Ride Details
//           </Button>
//         )}
//       </Card.Footer>
//     </Card>
//   );
// };

// export default RideTile;

// // import React from 'react';
// // import { Card, Button, Badge, ListGroup } from 'react-bootstrap';
// // import { useNavigate } from 'react-router-dom';

// // const RideTile = ({
// //   ride,
// //   currentUser,
// //   onSelectRide,
// //   showDriver = true,
// //   showPassengers = true,
// //   showContactButton = false,
// //   onContactDriver,
// // }) => {
// //   const navigate = useNavigate();

// //   const getUserStatus = () => {
// //     if (ride.driver?._id === currentUser?._id) return 'driver';
// //     if (ride.passengers.some((p) => p.user?._id === currentUser?._id))
// //       return 'passenger';
// //     if (
// //       ride.customerRequests?.some((req) => req.user?._id === currentUser?._id)
// //     )
// //       return 'requested';
// //     return null;
// //   };

// //   const userStatus = getUserStatus();

// //   // Get ride status dynamically
// //   const getRideStatus = () => {
// //     if (ride.isExpired) return { text: 'Expired', variant: 'secondary' };
// //     if (ride.availableSeats === 0)
// //       return { text: 'Fully Booked', variant: 'danger' };
// //     return { text: 'Available', variant: 'success' };
// //   };

// //   const { text: statusText, variant: statusVariant } = getRideStatus();

// //   // Fallback function for ride selection
// //   const handleSelectRide = () => {
// //     if (onSelectRide) onSelectRide(ride._id);
// //     else navigate(`/ride/${ride._id}`);
// //   };

// //   return (
// //     <Card
// //       style={{
// //         borderRadius: '10px',
// //         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// //         transition: 'transform 0.3s, box-shadow 0.3s',
// //         backgroundColor: ride.isExpired ? '#f8f9fa' : 'white',
// //         opacity: ride.isExpired ? 0.8 : 1,
// //       }}
// //       onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
// //       onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
// //     >
// //       <Card.Body>
// //         <Card.Title className='text-center'>
// //           <h5>
// //             Ride from <strong>{ride.startLocation || 'Unknown'}</strong> to{' '}
// //             <strong>{ride.endLocation || 'Unknown'}</strong>
// //           </h5>
// //         </Card.Title>

// //         <div className='text-center mb-3'>
// //           <Badge bg={statusVariant} style={{ fontSize: '1rem' }}>
// //             {statusText}
// //           </Badge>
// //         </div>

// //         {showDriver && (
// //           <Card.Text className='text-center'>
// //             <strong>Driver:</strong> {ride.driver?.name || 'N/A'}
// //             <br />
// //             <strong>Contact:</strong> {ride.driver?.phoneNumber || 'N/A'}
// //           </Card.Text>
// //         )}

// //         <Card.Text className='text-center'>
// //           <strong>Price:</strong> ₹{ride.price} <br />
// //           <strong>Available Seats:</strong> {ride.availableSeats}
// //         </Card.Text>

// //         <Card.Text className='text-center'>
// //           <strong>Date:</strong> {new Date(ride.rideDate).toLocaleDateString()}{' '}
// //           <br />
// //           <strong>Time:</strong>{' '}
// //           {new Date(ride.rideTime).toLocaleTimeString([], {
// //             hour: '2-digit',
// //             minute: '2-digit',
// //           })}
// //         </Card.Text>

// //         {showPassengers && ride.passengers.length > 0 && (
// //           <ListGroup className='mb-3'>
// //             <ListGroup.Item variant='light'>
// //               <strong>Passengers:</strong>
// //             </ListGroup.Item>
// //             {ride.passengers.map((p, index) => (
// //               <ListGroup.Item key={index}>
// //                 {p.user?.name || 'Unknown'} - {p.location || 'N/A'} <br />
// //                 {p.phoneNumber ? `Contact: ${p.phoneNumber}` : ''}
// //               </ListGroup.Item>
// //             ))}
// //           </ListGroup>
// //         )}

// //         {userStatus === 'driver' && (
// //           <p className='text-center text-success'>You created this ride.</p>
// //         )}

// //         {userStatus === 'passenger' && (
// //           <p className='text-center text-primary'>
// //             You have confirmed a seat on this ride.
// //           </p>
// //         )}

// //         {userStatus === 'requested' && (
// //           <p className='text-center text-warning'>
// //             You have requested this ride. Please wait for the car owner to
// //             respond.
// //           </p>
// //         )}
// //       </Card.Body>

// //       <Card.Footer className='text-center'>
// //         <Button
// //           variant='primary'
// //           onClick={handleSelectRide}
// //           style={{ width: '100%' }}
// //         >
// //           View Ride Details
// //         </Button>

// //         {showContactButton && userStatus !== 'driver' && (
// //           <Button
// //             variant='secondary'
// //             onClick={() => onContactDriver(ride.driver)}
// //             style={{ width: '100%', marginTop: '10px' }}
// //           >
// //             Contact Driver
// //           </Button>
// //         )}
// //       </Card.Footer>
// //     </Card>
// //   );
// // };

// // export default RideTile;

// // // import React from 'react';
// // // import { Card, Button, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';
// // // import { useNavigate } from 'react-router-dom';

// // // const RideTile = ({
// // //   ride,
// // //   currentUser,
// // //   onSelectRide,
// // //   showDriver = true,
// // //   showPassengers = true,
// // //   showContactButton = false,
// // //   onContactDriver,
// // // }) => {
// // //   const navigate = useNavigate();

// // //   const getUserStatus = () => {
// // //     if (ride.driver?._id === currentUser?._id) return 'driver';
// // //     if (ride.passengers.some((p) => p.user?._id === currentUser?._id))
// // //       return 'passenger';
// // //     if (
// // //       ride.customerRequests?.some((req) => req.user?._id === currentUser?._id)
// // //     )
// // //       return 'requested';
// // //     return null;
// // //   };

// // //   const userStatus = getUserStatus();

// // //   // Get ride status dynamically
// // //   const getRideStatus = () => {
// // //     if (ride.isExpired) return { text: 'Expired', variant: 'secondary' };
// // //     if (ride.availableSeats === 0)
// // //       return { text: 'Fully Booked', variant: 'danger' };
// // //     return { text: 'Available', variant: 'success' };
// // //   };

// // //   const { text: statusText, variant: statusVariant } = getRideStatus();

// // //   // Fallback function for ride selection
// // //   const handleSelectRide = () => {
// // //     if (onSelectRide) onSelectRide(ride._id);
// // //     else navigate(`/ride/${ride._id}`);
// // //   };

// // //   return (
// // //     <Card
// // //       style={{
// // //         borderRadius: '10px',
// // //         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// // //         transition: 'transform 0.3s, box-shadow 0.3s',
// // //         backgroundColor: ride.isExpired ? '#f8f9fa' : 'white',
// // //         opacity: ride.isExpired ? 0.8 : 1,
// // //       }}
// // //       onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
// // //       onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
// // //     >
// // //       <Card.Body>
// // //         <Card.Title className='text-center'>
// // //           Ride from <strong>{ride.startLocation || 'Unknown'}</strong> to{' '}
// // //           <strong>{ride.endLocation || 'Unknown'}</strong>
// // //         </Card.Title>
// // //         <div className='text-center mb-3'>
// // //           <Badge bg={statusVariant} style={{ fontSize: '1rem' }}>
// // //             {statusText}
// // //           </Badge>
// // //         </div>
// // //         {showDriver && (
// // //           <Card.Text className='text-center'>
// // //             <strong>Driver: </strong> {ride?.driver?.name || 'N/A'}
// // //           </Card.Text>
// // //         )}
// // //         <Card.Text className='text-center'>
// // //           <strong>Available Seats: </strong> {ride.availableSeats}
// // //         </Card.Text>
// // //         {userStatus === 'driver' && (
// // //           <p className='text-center text-success'>You created this ride.</p>
// // //         )}
// // //         {userStatus === 'passenger' && (
// // //           <p className='text-center text-primary'>
// // //             You have confirmed a seat on this ride.
// // //           </p>
// // //         )}
// // //         {userStatus === 'requested' && (
// // //           <p className='text-center text-warning'>
// // //             You have requested this ride. Please wait for the car owner to reach
// // //             out to you.
// // //           </p>
// // //         )}
// // //       </Card.Body>
// // //       <Card.Footer className='text-center'>
// // //         <Button
// // //           variant='primary'
// // //           onClick={handleSelectRide}
// // //           style={{ width: '100%' }}
// // //         >
// // //           View Ride Details
// // //         </Button>
// // //       </Card.Footer>
// // //     </Card>
// // //   );
// // // };

// // // export default RideTile;

// // // // import React from 'react';
// // // // import { Card, Button, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';
// // // // import { useNavigate } from 'react-router-dom';

// // // // const RideTile = ({
// // // //   ride,
// // // //   currentUser,
// // // //   onSelectRide,
// // // //   showDriver = true,
// // // //   showPassengers = true,
// // // //   showContactButton = false,
// // // //   onContactDriver,
// // // // }) => {
// // // //   const navigate = useNavigate();

// // // //   const isDriver = currentUser?._id === ride?.driver?._id;

// // // //   // Get ride status dynamically
// // // //   const getRideStatus = () => {
// // // //     if (ride.isExpired) return { text: 'Expired', variant: 'secondary' };
// // // //     if (ride.availableSeats === 0)
// // // //       return { text: 'Fully Booked', variant: 'danger' };
// // // //     return { text: 'Available', variant: 'success' };
// // // //   };

// // // //   const { text: statusText, variant: statusVariant } = getRideStatus();

// // // //   // Fallback function for ride selection
// // // //   const handleSelectRide = () => {
// // // //     if (onSelectRide) onSelectRide(ride._id);
// // // //     else navigate(`/ride/${ride._id}`);
// // // //   };

// // // //   // Tooltip for passengers
// // // //   const renderPassengerTooltip = (
// // // //     <Tooltip>
// // // //       {ride.passengers.length
// // // //         ? ride.passengers.map((p, index) => (
// // // //             <div key={index}>
// // // //               {p.user?.name || 'Unknown'} ({p.location || 'N/A'})
// // // //             </div>
// // // //           ))
// // // //         : 'No passengers'}
// // // //     </Tooltip>
// // // //   );

// // // //   // Tooltip for driver contact
// // // //   const renderContactTooltip = (
// // // //     <Tooltip>
// // // //       <strong>Email:</strong> {ride.driver?.email || 'N/A'}
// // // //       <br />
// // // //       <strong>Phone:</strong> {ride.driver?.phone || 'N/A'}
// // // //     </Tooltip>
// // // //   );

// // // //   return (
// // // //     <Card
// // // //       style={{
// // // //         borderRadius: '10px',
// // // //         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// // // //         transition: 'transform 0.3s, box-shadow 0.3s',
// // // //         backgroundColor: ride.isExpired ? '#f8f9fa' : 'white', // Dim expired rides
// // // //         opacity: ride.isExpired ? 0.8 : 1,
// // // //       }}
// // // //       onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
// // // //       onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
// // // //     >
// // // //       <Card.Body>
// // // //         {/* Ride Title */}
// // // //         <Card.Title className='text-center'>
// // // //           Ride from <strong>{ride.startLocation || 'Unknown'}</strong> to{' '}
// // // //           <strong>{ride.endLocation || 'Unknown'}</strong>
// // // //         </Card.Title>

// // // //         {/* Status Badge */}
// // // //         <div className='text-center mb-3'>
// // // //           <Badge bg={statusVariant} style={{ fontSize: '1rem' }}>
// // // //             {statusText}
// // // //           </Badge>
// // // //         </div>

// // // //         {/* Driver Info */}
// // // //         {showDriver && (
// // // //           <Card.Text className='text-center'>
// // // //             <strong>Driver: </strong> {ride?.driver?.name || 'N/A'}{' '}
// // // //             {ride?.driver?.email && (
// // // //               <OverlayTrigger placement='top' overlay={renderContactTooltip}>
// // // //                 <span style={{ color: '#0d6efd', cursor: 'pointer' }}>
// // // //                   {' '}
// // // //                   (Contact)
// // // //                 </span>
// // // //               </OverlayTrigger>
// // // //             )}
// // // //           </Card.Text>
// // // //         )}

// // // //         {/* Ride Details */}
// // // //         <Card.Text className='text-center'>
// // // //           <strong>Available Seats: </strong> {ride.availableSeats}
// // // //         </Card.Text>
// // // //         <Card.Text className='text-center'>
// // // //           <strong>Date: </strong> {new Date(ride.rideDate).toLocaleDateString()}
// // // //         </Card.Text>

// // // //         {/* Passengers Info */}
// // // //         {showPassengers && (
// // // //           <OverlayTrigger placement='top' overlay={renderPassengerTooltip}>
// // // //             <Card.Text className='text-center'>
// // // //               <strong>Passengers: </strong> {ride.passengers.length}
// // // //             </Card.Text>
// // // //           </OverlayTrigger>
// // // //         )}

// // // //         {/* Driver-Specific Message */}
// // // //         {isDriver && (
// // // //           <div className='text-center mt-3'>
// // // //             <span className='text-success'>
// // // //               <strong>You are the driver for this ride.</strong>
// // // //             </span>
// // // //           </div>
// // // //         )}
// // // //       </Card.Body>

// // // //       <Card.Footer className='text-center'>
// // // //         {/* Select Ride Button */}
// // // //         <Button
// // // //           variant={isDriver ? 'secondary' : 'primary'}
// // // //           onClick={handleSelectRide}
// // // //           disabled={isDriver}
// // // //           className='mb-2'
// // // //           style={{ width: '100%' }}
// // // //         >
// // // //           {isDriver ? 'You are the Driver' : 'View Ride Details'}
// // // //         </Button>

// // // //         {/* Contact Driver Button */}
// // // //         {showContactButton && !isDriver && (
// // // //           <Button
// // // //             variant='outline-primary'
// // // //             onClick={() => onContactDriver && onContactDriver(ride.driver)}
// // // //             style={{ width: '100%' }}
// // // //           >
// // // //             Contact Driver
// // // //           </Button>
// // // //         )}
// // // //       </Card.Footer>
// // // //     </Card>
// // // //   );
// // // // };

// // // // export default RideTile;

// // // // // import React, { useState } from 'react';
// // // // // import { Card, Button, Badge } from 'react-bootstrap';
// // // // // import { useNavigate } from 'react-router-dom';

// // // // // const RideTile = ({ ride, currentUser }) => {
// // // // //   const navigate = useNavigate();
// // // // //   const isDriver = currentUser?._id === ride?.driver?._id;

// // // // //   const handleMouseEnter = (e) => {
// // // // //     e.currentTarget.style.transform = 'scale(1.05)';
// // // // //     e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
// // // // //   };

// // // // //   const handleMouseLeave = (e) => {
// // // // //     e.currentTarget.style.transform = 'scale(1)';
// // // // //     e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
// // // // //   };

// // // // //   const onRideSelect = (rideId) => {
// // // // //     if (!isDriver) {
// // // // //       navigate(`/ride/${rideId}`);
// // // // //     }
// // // // //   };

// // // // //   const rideStatus = ride.isExpired
// // // // //     ? 'Expired'
// // // // //     : ride.availableSeats > 0
// // // // //     ? 'Available'
// // // // //     : 'Fully Booked';

// // // // //   const statusColor = ride.isExpired
// // // // //     ? 'secondary'
// // // // //     : ride.availableSeats > 0
// // // // //     ? 'success'
// // // // //     : 'danger';

// // // // //   return (
// // // // //     <Card
// // // // //       style={{
// // // // //         borderRadius: '10px',
// // // // //         transition: 'transform 0.3s, box-shadow 0.3s',
// // // // //       }}
// // // // //       className='h-100'
// // // // //       onMouseEnter={handleMouseEnter}
// // // // //       onMouseLeave={handleMouseLeave}
// // // // //     >
// // // // //       <Card.Body>
// // // // //         <Card.Title className='text-center'>
// // // // //           Ride from <strong>{ride.startLocation || 'Unknown'}</strong> to{' '}
// // // // //           <strong>{ride.endLocation || 'Unknown'}</strong>
// // // // //         </Card.Title>

// // // // //         <Card.Subtitle className='mb-3 text-muted text-center'>
// // // // //           <strong>Driver:</strong> {ride?.driver?.name || 'N/A'}{' '}
// // // // //           <small>({ride?.driver?.email || 'No email provided'})</small>
// // // // //         </Card.Subtitle>

// // // // //         <div className='text-center mb-2'>
// // // // //           <Badge bg={statusColor} style={{ fontSize: '1rem' }}>
// // // // //             {rideStatus}
// // // // //           </Badge>
// // // // //         </div>

// // // // //         <Card.Text className='text-center'>
// // // // //           <strong>Available Seats: </strong>
// // // // //           {ride.availableSeats}
// // // // //         </Card.Text>

// // // // //         <Card.Text className='text-center'>
// // // // //           <strong>Ride Date: </strong>
// // // // //           {ride.rideDate
// // // // //             ? new Date(ride.rideDate).toLocaleDateString()
// // // // //             : 'Not Set'}
// // // // //         </Card.Text>

// // // // //         <Card.Text className='text-center'>
// // // // //           <strong>Total Passengers: </strong>
// // // // //           {ride.passengers?.length || 0}
// // // // //         </Card.Text>

// // // // //         {isDriver && (
// // // // //           <div className='text-center mt-3'>
// // // // //             <span className='text-success'>
// // // // //               <strong>You are the driver for this ride.</strong>
// // // // //             </span>
// // // // //           </div>
// // // // //         )}
// // // // //       </Card.Body>

// // // // //       <Card.Footer className='text-center'>
// // // // //         <Button
// // // // //           variant={isDriver ? 'secondary' : 'primary'}
// // // // //           onClick={() => onRideSelect(ride._id)}
// // // // //           style={{
// // // // //             width: '100%',
// // // // //             padding: '10px',
// // // // //             borderRadius: '5px',
// // // // //             backgroundColor: isDriver ? '#6c757d' : '#0d6efd',
// // // // //             borderColor: isDriver ? '#6c757d' : '#0d6efd',
// // // // //           }}
// // // // //           disabled={isDriver}
// // // // //         >
// // // // //           {isDriver ? 'You are the Driver' : 'View Details'}
// // // // //         </Button>
// // // // //       </Card.Footer>
// // // // //     </Card>
// // // // //   );
// // // // // };

// // // // // export default RideTile;

// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { Card, Button } from 'react-bootstrap';
// // // // // // import { useNavigate } from 'react-router-dom'; // Change this import

// // // // // // const RideTile = ({ ride, currentUser }) => {
// // // // // //   const [selectedRideId, setSelectedRideId] = useState(null);
// // // // // //   const navigate = useNavigate(); // Change this line

// // // // // //   const handleMouseEnter = (e) => {
// // // // // //     e.currentTarget.style.transform = 'scale(1.05)';
// // // // // //   };

// // // // // //   const handleMouseLeave = (e) => {
// // // // // //     e.currentTarget.style.transform = 'scale(1)';
// // // // // //   };

// // // // // //   const onRideSelect = (rideId) => {
// // // // // //     setSelectedRideId(rideId);
// // // // // //     navigate(`/ride/${rideId}`); // Change this line
// // // // // //   };

// // // // // //   // Check if the current user is the driver
// // // // // //   const isDriver = currentUser?._id === ride.driver._id;

// // // // // //   return (
// // // // // //     <Card
// // // // // //       style={{
// // // // // //         borderRadius: '10px',
// // // // // //         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// // // // // //         transition: 'transform 0.3s, box-shadow 0.3s',
// // // // // //       }}
// // // // // //       className='h-100'
// // // // // //       onMouseEnter={handleMouseEnter}
// // // // // //       onMouseLeave={handleMouseLeave}
// // // // // //       onClick={() => !isDriver && onRideSelect(ride._id)} // Prevent navigation if the user is the driver
// // // // // //     >
// // // // // //       <Card.Body>
// // // // // //         <Card.Title className='text-center'>
// // // // // //           Ride from <strong>{ride.startLocation}</strong> to{' '}
// // // // // //           <strong>{ride.endLocation}</strong>
// // // // // //         </Card.Title>
// // // // // //         <Card.Subtitle className='mb-2 text-muted text-center'>
// // // // // //           <strong>Driver:</strong> {ride} ({ride.driver.email})
// // // // // //         </Card.Subtitle>
// // // // // //         <Card.Text className='text-center'>
// // // // // //           <strong>Available Seats: </strong> {ride.availableSeats}
// // // // // //         </Card.Text>
// // // // // //         <Card.Text className='text-center'>
// // // // // //           <strong>Ride Date: </strong>{' '}
// // // // // //           {new Date(ride.rideDate).toLocaleDateString()}
// // // // // //         </Card.Text>
// // // // // //         <Card.Text className='text-center'>
// // // // // //           <strong>Passengers: </strong> {ride.passengers.length}
// // // // // //         </Card.Text>

// // // // // //         <div className='text-center'>
// // // // // //           <span
// // // // // //             style={{
// // // // // //               color: ride.availableSeats > 0 ? 'green' : 'red',
// // // // // //               fontWeight: 'bold',
// // // // // //             }}
// // // // // //           >
// // // // // //             {ride.availableSeats > 0 ? 'Available' : 'Fully Booked'}
// // // // // //           </span>
// // // // // //         </div>

// // // // // //         {/* Display special message if the user is the driver */}
// // // // // //         {isDriver && (
// // // // // //           <div className='text-center mt-3'>
// // // // // //             <span className='text-success'>
// // // // // //               You are the driver of this ride.
// // // // // //             </span>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </Card.Body>
// // // // // //       <Card.Footer className='text-center'>
// // // // // //         <Button
// // // // // //           variant='primary'
// // // // // //           onClick={() => !isDriver && onRideSelect(ride._id)} // Prevent navigation if the user is the driver
// // // // // //           style={{
// // // // // //             width: '100%',
// // // // // //             padding: '10px',
// // // // // //             borderRadius: '5px',
// // // // // //             backgroundColor: isDriver ? '#8e8e8e' : '#2196F3', // Gray out button if user is the driver
// // // // // //             borderColor: isDriver ? '#8e8e8e' : '#2196F3',
// // // // // //             color: 'white',
// // // // // //           }}
// // // // // //           disabled={isDriver} // Disable the button if the user is the driver
// // // // // //         >
// // // // // //           {isDriver ? 'You are the Driver' : 'Select Ride'}
// // // // // //         </Button>
// // // // // //       </Card.Footer>
// // // // // //     </Card>
// // // // // //   );
// // // // // // };

// // // // // // export default RideTile;

// // // // // // // import React, { useState } from 'react';
// // // // // // // import { Card, Button } from 'react-bootstrap';
// // // // // // // import { useNavigate } from 'react-router-dom'; // Change this import

// // // // // // // const RideTile = ({ ride }) => {
// // // // // // //   const [selectedRideId, setSelectedRideId] = React.useState(null);
// // // // // // //   const navigate = useNavigate(); // Change this line

// // // // // // //   const handleMouseEnter = (e) => {
// // // // // // //     e.currentTarget.style.transform = 'scale(1.05)';
// // // // // // //   };

// // // // // // //   const handleMouseLeave = (e) => {
// // // // // // //     e.currentTarget.style.transform = 'scale(1)';
// // // // // // //   };

// // // // // // //   const onRideSelect = (rideId) => {
// // // // // // //     console.log(rideId);
// // // // // // //     setSelectedRideId(rideId);
// // // // // // //     navigate(`/ride/${rideId}`); // Change this line
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <Card
// // // // // // //       style={{
// // // // // // //         borderRadius: '10px',
// // // // // // //         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// // // // // // //         transition: 'transform 0.3s, box-shadow 0.3s',
// // // // // // //       }}
// // // // // // //       className='h-100'
// // // // // // //       onMouseEnter={handleMouseEnter}
// // // // // // //       onMouseLeave={handleMouseLeave}
// // // // // // //       onClick={() => onRideSelect(ride._id)}
// // // // // // //     >
// // // // // // //       <Card.Body>
// // // // // // //         <Card.Title className='text-center'>
// // // // // // //           Ride from <strong>{ride.startLocation}</strong> to{' '}
// // // // // // //           <strong>{ride.endLocation}</strong>
// // // // // // //         </Card.Title>
// // // // // // //         <Card.Subtitle className='mb-2 text-muted text-center'>
// // // // // // //           <strong>Driver:</strong> {ride.driver.name} ({ride.driver.email})
// // // // // // //         </Card.Subtitle>
// // // // // // //         {/* <Card.Text className='text-center'>
// // // // // // //           <strong>Price: ₹{ride.price.toFixed(2)}</strong>
// // // // // // //         </Card.Text> */}
// // // // // // //         <Card.Text className='text-center'>
// // // // // // //           <strong>Available Seats: </strong> {ride.availableSeats}
// // // // // // //         </Card.Text>
// // // // // // //         <Card.Text className='text-center'>
// // // // // // //           <strong>Ride Date: </strong>{' '}
// // // // // // //           {new Date(ride.rideDate).toLocaleDateString()}
// // // // // // //         </Card.Text>
// // // // // // //         <Card.Text className='text-center'>
// // // // // // //           <strong>Passengers: </strong> {ride.passengers.length}
// // // // // // //         </Card.Text>
// // // // // // //         <div className='text-center'>
// // // // // // //           <span
// // // // // // //             style={{
// // // // // // //               color: ride.availableSeats > 0 ? 'green' : 'red',
// // // // // // //               fontWeight: 'bold',
// // // // // // //             }}
// // // // // // //           >
// // // // // // //             {ride.availableSeats > 0 ? 'Available' : 'Fully Booked'}
// // // // // // //           </span>
// // // // // // //         </div>
// // // // // // //       </Card.Body>
// // // // // // //       <Card.Footer className='text-center'>
// // // // // // //         <Button
// // // // // // //           variant='primary'
// // // // // // //           onClick={() => onRideSelect(ride._id)}
// // // // // // //           style={{
// // // // // // //             width: '100%',
// // // // // // //             padding: '10px',
// // // // // // //             borderRadius: '5px',
// // // // // // //             backgroundColor: '#2196F3',
// // // // // // //             borderColor: '#2196F3',
// // // // // // //             color: 'white',
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           Select Ride
// // // // // // //         </Button>
// // // // // // //       </Card.Footer>
// // // // // // //     </Card>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default RideTile;
