import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import { createRide } from '../../api/rideApi';
import AutocompleteSearch from '../generalComponents/locationBlock.js'; // Import the AutocompleteSearch component
import axios from 'axios';

const CreateRide = () => {
  const [rideData, setRideData] = useState({
    startLocation: '',
    endLocation: '',
    rideDate: '',
    availableSeats: 1,
    startCoords: null,
    endCoords: null,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [distance, setDistance] = useState(null); // To hold the distance

  // Handle input change
  const handleChange = (e) => {
    setRideData({
      ...rideData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle location selection
  const handleSelectLocation = (value, fieldName) => {
    setRideData({
      ...rideData,
      [fieldName]: value,
    });

    if (fieldName === 'startLocation') {
      fetchCoordinates(value, 'start');
    } else if (fieldName === 'endLocation') {
      fetchCoordinates(value, 'end');
    }
  };

  // Fetch coordinates for the selected location using Nominatim API
  const fetchCoordinates = async (address, type) => {
    try {
      const response = await axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
          params: {
            q: address,
            format: 'json',
            addressdetails: 1,
            limit: 1,
          },
        }
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        if (type === 'start') {
          setRideData({
            ...rideData,
            startCoords: { lat, lon },
          });
        } else if (type === 'end') {
          setRideData({
            ...rideData,
            endCoords: { lat, lon },
          });
        }
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  // Calculate the distance between start and end locations using OpenRouteService
  useEffect(() => {
    if (rideData.startCoords && rideData.endCoords) {
      const { startCoords, endCoords } = rideData;

      const calculateDistance = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            'https://api.openrouteservice.org/v2/directions/driving-car',
            {
              params: {
                api_key:
                  '5b3ce3597851110001cf62483628cb4427c2430b96c354f4d63058fd', // Replace with your OpenRouteService API Key
                start: `${startCoords.lon},${startCoords.lat}`,
                end: `${endCoords.lon},${endCoords.lat}`,
              },
            }
          );
          const distanceInMeters =
            response.data.features[0].properties.segments[0].distance;
          setDistance((distanceInMeters / 1000).toFixed(2)); // Convert to km
          setIsLoading(false);
        } catch (error) {
          console.error('Error calculating distance:', error);
          setIsLoading(false);
        }
      };

      calculateDistance();
    }
  }, [rideData.startCoords, rideData.endCoords]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      if (
        !rideData.startLocation ||
        !rideData.endLocation ||
        !rideData.rideDate ||
        !rideData.availableSeats
      ) {
        throw new Error('All fields are required');
      }

      const newRide = await createRide(rideData);
      setIsLoading(false);
      setSuccessMessage('Ride created successfully!');
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <div>
      <h3>Create a Ride</h3>
      {successMessage && <Alert variant='success'>{successMessage}</Alert>}
      {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* Start Location */}
        <Form.Group controlId='startLocation'>
          <Form.Label>Start Location</Form.Label>
          <AutocompleteSearch
            fieldName='startLocation'
            value={rideData.startLocation}
            onSelectLocation={handleSelectLocation}
          />
        </Form.Group>

        {/* End Location */}
        <Form.Group controlId='endLocation'>
          <Form.Label>End Location</Form.Label>
          <AutocompleteSearch
            fieldName='endLocation'
            value={rideData.endLocation}
            onSelectLocation={handleSelectLocation}
          />
        </Form.Group>

        {/* Ride Date */}
        <Form.Group controlId='rideDate'>
          <Form.Label>Ride Date</Form.Label>
          <Form.Control
            type='date'
            name='rideDate'
            value={rideData.rideDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Available Seats */}
        <Form.Group controlId='availableSeats'>
          <Form.Label>Seats Available</Form.Label>
          <Form.Control
            type='number'
            name='availableSeats'
            value={rideData.availableSeats}
            onChange={handleChange}
            required
            min='1'
          />
        </Form.Group>

        {/* Distance */}
        {distance && !isLoading && (
          <div>
            <strong>Distance:</strong> {distance} km
          </div>
        )}
        {isLoading && <Spinner animation='border' />}

        {/* Submit Button */}
        <Button type='submit' variant='primary' disabled={isLoading}>
          {isLoading ? (
            <Spinner as='span' animation='border' size='sm' />
          ) : (
            'Create Ride'
          )}
        </Button>
      </Form>
    </div>
  );
};

export default CreateRide;

// // CreateRide.js
// import React, { useState } from 'react';
// import { Button, Form, Alert, Spinner } from 'react-bootstrap';
// import { createRide } from '../../api/rideApi';
// import AutocompleteSearch from '../generalComponents/locationBlock.js'; // Import the AutocompleteSearch component

// const CreateRide = () => {
//   const [rideData, setRideData] = useState({
//     startLocation: '',
//     endLocation: '',
//     rideDate: '',
//     availableSeats: 1,
//   });

//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   // Handle input change
//   const handleChange = (e) => {
//     setRideData({
//       ...rideData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle location selection
//   const handleSelectLocation = (value, fieldName) => {
//     setRideData({
//       ...rideData,
//       [fieldName]: value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');
//     setSuccessMessage('');
//     setIsLoading(true);

//     try {
//       if (
//         !rideData.startLocation ||
//         !rideData.endLocation ||
//         !rideData.rideDate ||
//         !rideData.availableSeats
//       ) {
//         throw new Error('All fields are required');
//       }

//       const newRide = await createRide(rideData);
//       setIsLoading(false);
//       setSuccessMessage('Ride created successfully!');
//     } catch (error) {
//       setIsLoading(false);
//       setErrorMessage(error.message || 'An unexpected error occurred');
//     }
//   };

//   return (
//     <div>
//       <h3>Create a Ride</h3>
//       {successMessage && <Alert variant='success'>{successMessage}</Alert>}
//       {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

//       <Form onSubmit={handleSubmit}>
//         {/* Start Location */}
//         <Form.Group controlId='startLocation'>
//           <Form.Label>Start Location</Form.Label>
//           <AutocompleteSearch
//             fieldName='Start Location'
//             value={rideData.startLocation}
//             onSelectLocation={handleSelectLocation}
//           />
//         </Form.Group>

//         {/* End Location */}
//         <Form.Group controlId='endLocation'>
//           <Form.Label>End Location</Form.Label>
//           <AutocompleteSearch
//             fieldName='End Location'
//             value={rideData.endLocation}
//             onSelectLocation={handleSelectLocation}
//           />
//         </Form.Group>

//         {/* Ride Date */}
//         <Form.Group controlId='rideDate'>
//           <Form.Label>Ride Date</Form.Label>
//           <Form.Control
//             type='date'
//             name='rideDate'
//             value={rideData.rideDate}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         {/* Available Seats */}
//         <Form.Group controlId='availableSeats'>
//           <Form.Label>Seats Available</Form.Label>
//           <Form.Control
//             type='number'
//             name='availableSeats'
//             value={rideData.availableSeats}
//             onChange={handleChange}
//             required
//             min='1'
//           />
//         </Form.Group>

//         {/* Submit Button */}
//         <Button type='submit' variant='primary' disabled={isLoading}>
//           {isLoading ? (
//             <Spinner as='span' animation='border' size='sm' />
//           ) : (
//             'Create Ride'
//           )}
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default CreateRide;
