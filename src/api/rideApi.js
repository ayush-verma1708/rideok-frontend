import axios from 'axios';

const API_URL = 'http://localhost:5000/api/rides'; // Adjust based on your backend server URL

// Get the user token from localStorage
const getToken = () => localStorage.getItem('token');

// Axios configuration with Authorization Header
const axiosConfig = () => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
});

// 1. Create a Ride
export const createRide = async (rideData) => {
  const response = await axios.post(
    `${API_URL}/create`,
    rideData,
    axiosConfig()
  );
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
    axiosConfig()
  );
  return response.data;
};

// 4. Update a Ride (driver only)
export const updateRide = async (rideId, updatedData) => {
  const response = await axios.put(
    `${API_URL}/update/${rideId}`,
    updatedData,
    axiosConfig()
  );
  return response.data;
};

// 5. Delete a Ride (driver only)
export const deleteRide = async (rideId) => {
  const response = await axios.delete(
    `${API_URL}/delete/${rideId}`,
    axiosConfig()
  );
  return response.data;
};
