// baseApi.js

// Define the base API URLs for production and test environments
const Api_Main_URL = 'https://rideok-backend.onrender.com/api';
const Api_Test_URL = 'http://localhost:5000/api'; // Define your test URL if needed

// Check if the app is running in development or production
// const API_URL =
//   process.env.NODE_ENV === 'production' ? Api_Main_URL : Api_Test_URL;

// Export the API_URL
export default Api_Test_URL;
