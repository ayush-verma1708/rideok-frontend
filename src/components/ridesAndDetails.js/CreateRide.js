import React, { useState } from 'react';
import { createRide } from '../api/rideApi';

const CreateRide = () => {
  const [rideData, setRideData] = useState({
    startLocation: '',
    endLocation: '',
    price: '',
    availableSeats: '',
    rideDate: '',
  });
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setRideData({ ...rideData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createRide(rideData);
      setResponse(`Ride Created: ID ${result._id}`);
    } catch (error) {
      setResponse(`Error: ${error.response?.data?.message}`);
    }
  };

  return (
    <div>
      <h2>Create a Ride</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='startLocation'
          placeholder='Start Location'
          value={rideData.startLocation}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='endLocation'
          placeholder='End Location'
          value={rideData.endLocation}
          onChange={handleChange}
          required
        />
        <input
          type='number'
          name='price'
          placeholder='Price'
          value={rideData.price}
          onChange={handleChange}
          required
        />
        <input
          type='number'
          name='availableSeats'
          placeholder='Available Seats'
          value={rideData.availableSeats}
          onChange={handleChange}
          required
        />
        <input
          type='date'
          name='rideDate'
          value={rideData.rideDate}
          onChange={handleChange}
          required
        />
        <button type='submit'>Create Ride</button>
      </form>
      <p>{response}</p>
    </div>
  );
};

export default CreateRide;
