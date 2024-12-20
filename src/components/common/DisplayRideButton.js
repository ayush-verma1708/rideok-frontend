import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { submitPhoneNumber } from '../../api/userApi';
import { useAuth } from '../../components/generalComponents/authContext'; // Import useAuth from context
import { getUserProfile } from '../../api/userApi'; // Import the getUserProfile function
import { addPassenger } from '../../api/rideApi'; // Import addPassenger function from rideApi

const DisplayRideButton = ({ rideId }) => {
  // Accept rideId as a prop
  const { state, setUser } = useAuth(); // Access auth context's state and functions
  const { token, user } = state; // Destructure token and user from state

  // State to control modal visibility, phone number, and location
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');

  // Fetch user profile if the token is present
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token && !user) {
        // Fetch the user profile from API if the user is not already set
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

  const handleSubmit = async () => {
    console.log('Handle submit clicked');
    const passengerData = {
      rideId: rideId._id,
      userId: user._id,
      location: location || 'Unknown', // Make sure location is included (use user.location instead of location)
      phoneNumber: phoneNumber, // From modal
    };
    console.log(passengerData, token);
    const userId = user._id;
    const UserphoneNumber = phoneNumber;
    const Usertoken = token;
    try {
      // Step 1: Submit the phone number first
      const phoneResponse = await submitPhoneNumber(
        userId,
        UserphoneNumber,
        Usertoken
      );

      console.log('Phone Response:', phoneResponse); // Log the full response to check structure
      if (!phoneResponse.success) {
        alert(phoneResponse.message || 'Failed to submit phone number.');
        return;
      }

      console.log('Phone number submitted:', phoneResponse.message);

      const passengerResponse = await addPassenger(passengerData, token);
      console.log('Passenger Response:', passengerResponse); // Log the full response

      if (passengerResponse.success) {
        alert('Passenger added successfully to the ride!');
      } else {
        alert('Failed to add passenger to the ride.');
        console.log(
          'Error adding passenger:',
          passengerResponse.message || 'Unknown error'
        );
      }
    } catch (error) {
      console.error('Error:', error);
      alert(
        'An error occurred while submitting the phone number or adding the passenger.'
      );
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
    </div>
  );
};

export default DisplayRideButton;
