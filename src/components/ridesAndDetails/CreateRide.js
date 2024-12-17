// CreateRide.js
import React, { useState } from 'react';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import { createRide } from '../../api/rideApi';
import AutocompleteSearch from '../generalComponents/locationBlock.js'; // Import the AutocompleteSearch component

const CreateRide = () => {
  const [rideData, setRideData] = useState({
    startLocation: '',
    endLocation: '',
    rideDate: '',
    availableSeats: 1,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
  };

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
            fieldName='Start Location'
            value={rideData.startLocation}
            onSelectLocation={handleSelectLocation}
          />
        </Form.Group>

        {/* End Location */}
        <Form.Group controlId='endLocation'>
          <Form.Label>End Location</Form.Label>
          <AutocompleteSearch
            fieldName='End Location'
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

// import React, { useState, useEffect, useCallback } from 'react';
// import { Button, Form, Alert, Spinner } from 'react-bootstrap';
// import Autosuggest from 'react-autosuggest';
// import debounce from 'lodash.debounce';
// import { createRide } from '../../api/rideApi';

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
//   const [startLocationSuggestions, setStartLocationSuggestions] = useState([]);
//   const [endLocationSuggestions, setEndLocationSuggestions] = useState([]);

//   const handleChange = (e, { newValue }) => {
//     setRideData({
//       ...rideData,
//       [e.target.name]: newValue,
//     });
//   };

//   const handleSelectLocation = (value, name) => {
//     setRideData({
//       ...rideData,
//       [name]: value,
//     });
//   };

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

//   const inputProps = (name, value, onChange) => ({
//     value,
//     onChange: (e, { newValue }) => onChange(e, { newValue }),
//     placeholder: `Enter ${name}`,
//     name,
//   });

//   return (
//     <div>
//       <h3>Create a Ride</h3>
//       {successMessage && <Alert variant='success'>{successMessage}</Alert>}
//       {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId='startLocation'>
//           <Form.Label>Start Location</Form.Label>
//         </Form.Group>

//         <Form.Group controlId='endLocation'>
//           <Form.Label>End Location</Form.Label>
//         </Form.Group>

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
