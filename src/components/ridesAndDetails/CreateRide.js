import React, { useState, useEffect } from 'react';
import { Button, Form, Alert, Spinner, Container } from 'react-bootstrap';
import { createRide } from '../../api/rideApi';
import AutocompleteSearch from '../generalComponents/locationBlock.js';
import axios from 'axios';

const CreateRide = () => {
  const [rideData, setRideData] = useState({
    startLocation: '',
    endLocation: '',
    rideDate: '',
    rideTime: '',
    availableSeats: 1,
    startCoords: null,
    endCoords: null,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [distance, setDistance] = useState(null);
  const [priceEstimate, setPriceEstimate] = useState(null);

  const baseFarePerKm = 13; // ₹13 per km

  // Traffic and road condition multipliers
  const trafficMultipliers = { light: 1, moderate: 1.2, heavy: 1.5 };
  const roadTypeMultipliers = { highway: 1, city: 1.3 };

  // Fetch Coordinates
  const fetchCoordinates = async (address, type) => {
    try {
      const response = await axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
          params: { q: address, format: 'json', limit: 1 },
        }
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setRideData((prev) => ({
          ...prev,
          [type === 'start' ? 'startCoords' : 'endCoords']: { lat, lon },
        }));
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  // Calculate Distance
  const calculateDistance = async () => {
    if (!rideData.startCoords || !rideData.endCoords) return;

    const { startCoords, endCoords } = rideData;

    try {
      setIsLoading(true);
      const response = await axios.get(
        'https://api.openrouteservice.org/v2/directions/driving-car',
        {
          params: {
            api_key: '5b3ce3597851110001cf62483628cb4427c2430b96c354f4d63058fd',
            start: `${startCoords.lon},${startCoords.lat}`,
            end: `${endCoords.lon},${endCoords.lat}`,
          },
        }
      );

      const distanceInMeters =
        response.data.features[0].properties.segments[0].distance;
      const distanceInKm = (distanceInMeters / 1000).toFixed(2);

      setDistance(distanceInKm);
      calculatePriceEstimate(distanceInKm);
    } catch (error) {
      console.error('Error calculating distance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate Price Estimate
  const calculatePriceEstimate = (distance) => {
    const trafficMultiplier = trafficMultipliers['moderate']; // Example: moderate traffic
    const roadTypeMultiplier = roadTypeMultipliers['highway'];

    const basePrice = distance * baseFarePerKm;
    const finalPrice = basePrice * trafficMultiplier * roadTypeMultiplier;

    setPriceEstimate(finalPrice.toFixed(2));
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setRideData({ ...rideData, [e.target.name]: e.target.value });
  };

  // Handle Location Selection
  const handleSelectLocation = (value, fieldName) => {
    setRideData({ ...rideData, [fieldName]: value });
    fetchCoordinates(value, fieldName === 'startLocation' ? 'start' : 'end');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    // Convert price to a float and validate it
    const priceInNumber = parseFloat(priceEstimate);
    if (isNaN(priceInNumber)) {
      setErrorMessage('Invalid price estimate');
      setIsLoading(false);
      return;
    }

    // Combine rideDate and rideTime into ISO format
    const rideDateTime = new Date(
      `${rideData.rideDate}T${rideData.rideTime}:00Z`
    );

    // Clean up the object to only include necessary fields
    const cleanedRideData = {
      startLocation: rideData.startLocation,
      endLocation: rideData.endLocation,
      rideDate: rideData.rideDate, // Still send the rideDate separately
      rideTime: rideDateTime.toISOString(), // ISO string for rideTime
      availableSeats: parseInt(rideData.availableSeats, 10), // Ensure availableSeats is a number
      price: priceInNumber, // Ensure price is a number
    };

    console.log('Submitting cleaned ride data:', cleanedRideData);

    try {
      // Call the backend API with the cleaned data
      const newRide = await createRide(cleanedRideData);
      setIsLoading(false);
      setSuccessMessage('Ride created successfully!');
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(
        error.response?.data?.message || 'An unexpected error occurred'
      );
    }
  };

  // Get current date and time
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are 0-based
    const day = currentDate.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;
  };

  const getCurrentTime = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }`;
  };

  useEffect(() => {
    if (rideData.startCoords && rideData.endCoords) {
      calculateDistance();
    }
  }, [rideData.startCoords, rideData.endCoords]);

  return (
    <div>
      <h3>Create a Ride</h3>
      {successMessage && <Alert variant='success'>{successMessage}</Alert>}
      {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='startLocation'>
          <Form.Label>Start Location</Form.Label>
          <AutocompleteSearch
            fieldName='startLocation'
            value={rideData.startLocation}
            onSelectLocation={handleSelectLocation}
          />
        </Form.Group>

        <Form.Group controlId='endLocation'>
          <Form.Label>End Location</Form.Label>
          <AutocompleteSearch
            fieldName='endLocation'
            value={rideData.endLocation}
            onSelectLocation={handleSelectLocation}
          />
        </Form.Group>

        <Form.Group controlId='rideDate'>
          <Form.Label>Ride Date</Form.Label>
          <Form.Control
            type='date'
            name='rideDate'
            value={rideData.rideDate}
            onChange={handleChange}
            required
            min={getCurrentDate()} // Prevent selecting past dates
          />
        </Form.Group>

        {/* Ride Time */}
        <Form.Group controlId='rideTime'>
          <Form.Label>Ride Time</Form.Label>
          <Form.Control
            type='time'
            name='rideTime'
            value={rideData.rideTime}
            onChange={handleChange}
            required
            min={
              rideData.rideDate === getCurrentDate()
                ? getCurrentTime()
                : '00:00'
            } // Allow only future time if today's date is selected
          />
        </Form.Group>

        <Form.Group controlId='availableSeats'>
          <Form.Label>Seats Available</Form.Label>
          <Form.Control
            type='number'
            name='availableSeats'
            min='1'
            value={rideData.availableSeats}
            onChange={handleChange}
          />
        </Form.Group>

        {distance && <p>Distance: {distance} km</p>}
        {priceEstimate && <p>Price Estimate: ₹{priceEstimate}</p>}
        {isLoading && <Spinner animation='border' />}

        <Button type='submit' variant='primary' disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Ride'}
        </Button>
      </Form>
    </div>
  );
};

export default CreateRide;
