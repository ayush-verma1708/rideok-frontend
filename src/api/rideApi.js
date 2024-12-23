import axios from 'axios';

const API_URL = 'https://rideok-new.vercel.app/rides'; // Adjust based on your backend server URL

// Get the user token from localStorage
const getToken = () => localStorage.getItem('token');

// 1. Create a Ride
export const createRide = async (rideData) => {
  const response = await axios.post(`${API_URL}/create`, rideData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

// 2. Search for Rides
export const searchRides = async (startLocation, endLocation) => {
  const response = await axios.get(
    `${API_URL}/search?startLocation=${startLocation}&endLocation=${endLocation}`
  );
  return response.data;
};

// 3. Book a Ride
export const bookRide = async (rideId) => {
  const response = await axios.post(
    `${API_URL}/book/${rideId}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return response.data;
};

// 4. Update a Ride (driver only)
export const updateRide = async (rideId, updatedData) => {
  const response = await axios.put(`${API_URL}/update/${rideId}`, updatedData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

// 5. Delete a Ride (driver only)
// export const deleteRide = async (rideId) => {
//   const response = await axios.delete(`${API_URL}/delete/${rideId}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${getToken()}`,
//     },
//   });
//   return response.data;
// };

// 6. Get Ride Details
export const getRideDetails = async (rideId) => {
  const response = await axios.get(`${API_URL}/rideId/${rideId}`);
  return response.data;
};

// 7. Get All Rides
export const getAllRides = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// 8. Get My Rides
export const getMyRides = async () => {
  try {
    const response = await axios.get(`${API_URL}/user-rides`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    }); // Check if the response is valid and contains data
    if (response && response.data && Array.isArray(response.data)) {
      return response.data; // Return the rides data
    } else {
      return []; // Return an empty array if no rides are found or data is malformed
    }
  } catch (err) {
    console.error('Error fetching rides:', err);
    // Handle different types of errors and return an appropriate default response
    if (err.response && err.response.status === 404) {
      // Handle case where no rides exist
      return []; // No rides found
    }
    // Handle network errors or other issues
    return []; // You can return a default empty array or a fallback message if needed
  }
};

export const handleRideRequest = async (rideId, action, passengerId) => {
  try {
    // API call to the backend
    const response = await axios.post(`${API_URL}/handle-request`, {
      rideId,
      action,
      passengerId,
    });

    // Return the updated ride data
    return response.data;
  } catch (error) {
    console.error('Error handling ride request:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to handle ride request'
    );
  }
};
