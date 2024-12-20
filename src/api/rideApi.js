import axios from 'axios';

const API_URL = 'http://localhost:5000/api/rides'; // Adjust based on your backend server URL

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
export const deleteRide = async (rideId) => {
  const response = await axios.delete(`${API_URL}/delete/${rideId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

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
  const response = await axios.get(`${API_URL}/user-rides`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

// Function to approve a passenger for a specific ride
export const approvePassenger = async (rideId, passengerId, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/approve-passenger/${rideId}/${passengerId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authentication
        },
      }
    );
    return response.data; // Return the response from the API
  } catch (error) {
    console.error('Error approving passenger:', error);
    throw error; // Handle the error as per your needs
  }
};

// Function to reject a passenger for a specific ride
export const rejectPassenger = async (rideId, passengerId, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/reject-passenger/${rideId}/${passengerId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authentication
        },
      }
    );
    return response.data; // Return the response from the API
  } catch (error) {
    console.error('Error rejecting passenger:', error);
    throw error; // Handle the error as per your needs
  }
};

// Function to add a passenger to a ride
// export const addPassenger = async (rideId, userId, token) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/add-passenger`,
//       { rideId, userId },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // Include the token in the header for authentication
//         },
//       }
//     );
//     return response.data; // Return the response from the API
//   } catch (error) {
//     console.error('Error adding passenger:', error);
//     throw error; // Handle the error as per your needs
//   }
// };
export const addPassenger = async (rideId, userId, token) => {
  console.log(rideId, userId, token);
  try {
    const response = await axios.post(
      `${API_URL}/add-passenger`,
      { rideId, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Passenger added successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding passenger:', error.response || error);
    // Handle the error more gracefully if needed
    throw error;
  }
};
