import axios from 'axios';

// Base URL for API requests
const baseURL = 'http://localhost:5000/api';

// Create a pre-configured Axios instance
const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Login User
export const loginUser = async (email, password) => {
  const response = await axiosInstance.post('/users/login', {
    email,
    password,
  });
  return response.data;
};

// 2. Register User
export const registerUser = async (userData) => {
  const response = await axiosInstance.post('/users/register', userData);
  return response.data;
};

// 3. Get User Profile
export const getUserProfile = async (token) => {
  const response = await axiosInstance.get('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 4. Update User Profile
export const updateUserProfile = async (token, updatedData) => {
  const response = await axiosInstance.put('/users/profile', updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 5. Delete User
export const deleteUser = async (token) => {
  const response = await axiosInstance.delete('/users/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
