import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { submitPhoneNumber, addPassenger } from '../../api/driverApi.js';
import { useAuth } from '../../components/generalComponents/authContext'; // Import useAuth from context
import { getUserProfile } from '../../api/userApi'; // Import the getUserProfile function

const DisplayRideButton = ({ rideId }) => {
  const { state, setUser } = useAuth(); // Access auth context's state and functions
  const { token, user } = state; // Destructure token and user from state

  // State to control modal visibility, phone number, location, and snackbar visibility
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  // Fetch user profile if the token is present
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token && !user) {
        try {
          const userProfile = await getUserProfile(token); // Fetch user profile using token
          setUser(userProfile); // Set the user profile in context
          window.localStorage.setItem('user', JSON.stringify(userProfile)); // Optionally store in localStorage
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [token, user, setUser]);

  // Handle opening the modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
  };

  // Handle phone number change
  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  // Handle location change
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    const userId = user._id;
    const UserphoneNumber = phoneNumber;
    const Usertoken = token;

    try {
      // Reset snackbar state before each action
      setSnackbarMessage('');
      setSnackbarSeverity('success');
      setSnackbarOpen(false);

      // Step 1: Submit the phone number first
      const phoneResponse = await submitPhoneNumber(
        userId,
        UserphoneNumber,
        Usertoken
      );

      if (!phoneResponse.success) {
        setSnackbarMessage(
          phoneResponse.message || 'Failed to submit phone number.'
        );
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return; // Stop here if phone number submission fails
      }

      // Prepare the passenger data
      const passengerData = {
        rideId: rideId._id, // Ensure rideId is the valid _id from the ride object
        user: user._id, // The ID of the user (from the user object)
        phoneNumber: phoneNumber || user.phoneNumber, // Use the phone number from the modal or default from user
        location: location || 'Unknown', // Default to 'Unknown' if location is not provided
      };

      // Step 2: Add the passenger to the ride
      const passengerResponse = await addPassenger(passengerData);

      if (!passengerResponse.success) {
        setSnackbarMessage(
          passengerResponse.message || 'Failed to add passenger.'
        );
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }

      // Success response
      setSnackbarMessage('Passenger added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      // Reload the page on success
      // setTimeout(() => {
      // }, 1000); // Optional delay to let the snackbar message display
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage('An error occurred. Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div>
      <Button
        variant='contained'
        fullWidth
        sx={{
          backgroundColor: '#007bff',
          '&:hover': { backgroundColor: '#0056b3' },
        }}
        onClick={handleClickOpen} // Open the modal when clicked
      >
        Request Ride
      </Button>

      {/* Modal (Dialog) */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Your Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='phoneNumber'
            label='Phone Number'
            type='tel'
            fullWidth
            variant='outlined'
            value={phoneNumber}
            onChange={handlePhoneChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin='dense'
            id='location'
            label='Location'
            type='text'
            fullWidth
            variant='outlined'
            value={location}
            onChange={handleLocationChange}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DisplayRideButton;

// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import { submitPhoneNumber, addPassenger } from '../../api/driverApi.js';
// import { useAuth } from '../../components/generalComponents/authContext'; // Import useAuth from context
// import { getUserProfile } from '../../api/userApi'; // Import the getUserProfile function

// const DisplayRideButton = ({ rideId }) => {
//   const { state, setUser } = useAuth(); // Access auth context's state and functions
//   const { token, user } = state; // Destructure token and user from state

//   // State to control modal visibility, phone number, location, and snackbar visibility
//   const [open, setOpen] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [location, setLocation] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

//   // Fetch user profile if the token is present
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (token && !user) {
//         try {
//           const userProfile = await getUserProfile(token); // Fetch user profile using token
//           setUser(userProfile); // Set the user profile in context
//           window.localStorage.setItem('user', JSON.stringify(userProfile)); // Optionally store in localStorage
//         } catch (error) {
//           console.error('Error fetching user profile:', error);
//         }
//       }
//     };

//     fetchUserProfile();
//   }, [token, user, setUser]);

//   // Handle opening the modal
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   // Handle closing the modal
//   const handleClose = () => {
//     setOpen(false);
//   };

//   // Handle phone number change
//   const handlePhoneChange = (event) => {
//     setPhoneNumber(event.target.value);
//   };

//   // Handle location change
//   const handleLocationChange = (event) => {
//     setLocation(event.target.value);
//   };

//   // Handle Snackbar close
//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleSubmit = async () => {
//     console.log('Handle submit clicked');

//     const userId = user._id;
//     const UserphoneNumber = phoneNumber;
//     const Usertoken = token;

//     try {
//       // Step 1: Submit the phone number first
//       const phoneResponse = await submitPhoneNumber(
//         userId,
//         UserphoneNumber,
//         Usertoken
//       );

//       if (!phoneResponse.success) {
//         setSnackbarMessage(
//           phoneResponse.message || 'Failed to submit phone number.'
//         );
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//         return;
//       }

//       // Prepare the passenger data
//       const passengerData = {
//         rideId: rideId._id, // Ensure rideId is the valid _id from the ride object
//         user: user._id, // The ID of the user (from the user object)
//         phoneNumber: phoneNumber || user.phoneNumber, // Use the phone number from the modal or default from user
//         location: location || 'Unknown', // Default to 'Unknown' if location is not provided
//       };

//       // Step 2: Add the passenger to the ride
//       const passengerResponse = await addPassenger(passengerData);

//       if (!passengerResponse.success) {
//         setSnackbarMessage(
//           passengerResponse.message || 'Failed to add passenger.'
//         );
//         setSnackbarSeverity('error');
//         setSnackbarOpen(true);
//         return;
//       }

//       // Success response
//       setSnackbarMessage('Passenger added successfully!');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.error('Error:', error);
//       setSnackbarMessage('An error occurred. Please try again later.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     }
//   };

//   return (
//     <div>
//       <Button
//         variant='contained'
//         fullWidth
//         sx={{
//           backgroundColor: '#007bff',
//           '&:hover': { backgroundColor: '#0056b3' },
//         }}
//         onClick={handleClickOpen} // Open the modal when clicked
//       >
//         Request Ride
//       </Button>

//       {/* Modal (Dialog) */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Enter Your Details</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin='dense'
//             id='phoneNumber'
//             label='Phone Number'
//             type='tel'
//             fullWidth
//             variant='outlined'
//             value={phoneNumber}
//             onChange={handlePhoneChange}
//             sx={{ marginBottom: 2 }}
//           />
//           <TextField
//             margin='dense'
//             id='location'
//             label='Location'
//             type='text'
//             fullWidth
//             variant='outlined'
//             value={location}
//             onChange={handleLocationChange}
//             sx={{ marginBottom: 2 }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color='secondary'>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} color='primary'>
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for feedback */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbarSeverity}
//           sx={{ width: '100%' }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default DisplayRideButton;

// // import React, { useState, useEffect } from 'react';
// // import {
// //   Button,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogTitle,
// //   TextField,
// // } from '@mui/material';
// // import { submitPhoneNumber, addPassenger } from '../../api/driverApi.js';
// // import { useAuth } from '../../components/generalComponents/authContext'; // Import useAuth from context
// // import { getUserProfile } from '../../api/userApi'; // Import the getUserProfile function

// // const DisplayRideButton = ({ rideId }) => {
// //   // Accept rideId as a prop
// //   const { state, setUser } = useAuth(); // Access auth context's state and functions
// //   const { token, user } = state; // Destructure token and user from state

// //   // State to control modal visibility, phone number, and location
// //   const [open, setOpen] = useState(false);
// //   const [phoneNumber, setPhoneNumber] = useState('');
// //   const [location, setLocation] = useState('');

// //   // Fetch user profile if the token is present
// //   useEffect(() => {
// //     const fetchUserProfile = async () => {
// //       if (token && !user) {
// //         // Fetch the user profile from API if the user is not already set
// //         try {
// //           const userProfile = await getUserProfile(token); // Fetch user profile using token
// //           console.log(userProfile);
// //           setUser(userProfile); // Set the user profile in context
// //           window.localStorage.setItem('user', JSON.stringify(userProfile)); // Optionally store in localStorage
// //         } catch (error) {
// //           console.error('Error fetching user profile:', error);
// //         }
// //       }
// //     };

// //     fetchUserProfile();
// //   }, [token, user, setUser]);

// //   // Handle opening the modal
// //   const handleClickOpen = () => {
// //     setOpen(true);
// //   };

// //   // Handle closing the modal
// //   const handleClose = () => {
// //     setOpen(false);
// //   };

// //   // Handle phone number change
// //   const handlePhoneChange = (event) => {
// //     setPhoneNumber(event.target.value);
// //   };

// //   // Handle location change
// //   const handleLocationChange = (event) => {
// //     setLocation(event.target.value);
// //   };

// //   const handleSubmit = async () => {
// //     console.log('Handle submit clicked');

// //     const userId = user._id;
// //     const UserphoneNumber = phoneNumber;
// //     const Usertoken = token;

// //     try {
// //       // Step 1: Submit the phone number first
// //       const phoneResponse = await submitPhoneNumber(
// //         userId,
// //         UserphoneNumber,
// //         Usertoken
// //       );

// //       if (!phoneResponse.success) {
// //         alert(phoneResponse.message || 'Failed to submit phone number.');
// //         return;
// //       }

// //       // Prepare the passenger data
// //       const passengerData = {
// //         rideId: rideId._id, // Ensure rideId is the valid _id from the ride object
// //         user: user._id, // The ID of the user (from the user object)
// //         phoneNumber: phoneNumber || user.phoneNumber, // Use the phone number from the modal or default from user
// //         location: location || 'Unknown', // Default to 'Unknown' if location is not provided
// //       };

// //       // Step 2: Add the passenger to the ride
// //       const passengerResponse = await addPassenger(passengerData); // Pass passengerData directly to the function

// //       if (!passengerResponse.success) {
// //         alert(passengerResponse.message || 'Failed to add passenger.');
// //         return;
// //       }
// //     } catch (error) {
// //       console.error('Error:', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <Button
// //         variant='contained'
// //         fullWidth
// //         sx={{
// //           backgroundColor: '#007bff',
// //           '&:hover': { backgroundColor: '#0056b3' },
// //         }}
// //         onClick={handleClickOpen} // Open the modal when clicked
// //       >
// //         Request Ride
// //       </Button>

// //       {/* Modal (Dialog) */}
// //       <Dialog open={open} onClose={handleClose}>
// //         <DialogTitle>Enter Your Details</DialogTitle>
// //         <DialogContent>
// //           <TextField
// //             autoFocus
// //             margin='dense'
// //             id='phoneNumber'
// //             label='Phone Number'
// //             type='tel'
// //             fullWidth
// //             variant='outlined'
// //             value={phoneNumber}
// //             onChange={handlePhoneChange}
// //             sx={{ marginBottom: 2 }}
// //           />
// //           <TextField
// //             margin='dense'
// //             id='location'
// //             label='Location'
// //             type='text'
// //             fullWidth
// //             variant='outlined'
// //             value={location}
// //             onChange={handleLocationChange}
// //             sx={{ marginBottom: 2 }}
// //           />
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleClose} color='secondary'>
// //             Cancel
// //           </Button>
// //           <Button onClick={handleSubmit} color='primary'>
// //             Submit
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </div>
// //   );
// // };

// // export default DisplayRideButton;
