import axios from 'axios';
import API_URL from './baseApi';

// Base URL for API requests

export const submitPhoneNumber = async (user, phoneNumber, token) => {
  // Prepare the data being sent
  const requestData = {
    userId: user, // Ensure user._id is passed correctly
    phoneNumber, // Phone number entered by the user
  };

  try {
    // Make a PUT request to the API
    const response = await axios.put(
      `${API_URL}/users/updatePhoneNumber`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
      }
    );

    // Return the response data
    return response.data;
  } catch (error) {
    console.error('Error submitting phone number:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error occurred',
    };
  }
};

export const addPassenger = async (passengerData) => {
  try {
    const response = await fetch(`${API_URL}/driver/add-passenger`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Ensure that the content type is set to JSON
      },
      body: JSON.stringify({
        rideId: passengerData.rideId, // Send rideId as part of the body
        passengerData: passengerData, // Send passengerData (which already contains user, phoneNumber, location)
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add passenger');
    }

    const data = await response.json();
    console.log('Passenger added successfully:', data);
    return data; // Return data for further handling
  } catch (error) {
    console.error('Error adding passenger:', error.message);
    alert('Failed to add passenger. Please try again.');
  }
};
