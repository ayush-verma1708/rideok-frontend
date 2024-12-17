// For Drivers only
import React, { useState } from 'react';
import { updateRide } from '../../api/rideApi';
import { Button, Form } from 'react-bootstrap';

const UpdateRide = ({ rideId }) => {
  const [updatedData, setUpdatedData] = useState({
    startLocation: '',
    endLocation: '',
    rideDate: '',
    seatsAvailable: 1,
  });

  const handleChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRide = await updateRide(rideId, updatedData);
      console.log('Ride updated successfully:', updatedRide);
    } catch (error) {
      console.error('Error updating ride:', error);
    }
  };

  return (
    <div>
      <h3>Update Ride</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='startLocation'>
          <Form.Label>Start Location</Form.Label>
          <Form.Control
            type='text'
            name='startLocation'
            value={updatedData.startLocation}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId='endLocation'>
          <Form.Label>End Location</Form.Label>
          <Form.Control
            type='text'
            name='endLocation'
            value={updatedData.endLocation}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId='rideDate'>
          <Form.Label>Ride Date</Form.Label>
          <Form.Control
            type='date'
            name='rideDate'
            value={updatedData.rideDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId='seatsAvailable'>
          <Form.Label>Seats Available</Form.Label>
          <Form.Control
            type='number'
            name='seatsAvailable'
            value={updatedData.seatsAvailable}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type='submit' variant='primary'>
          Update Ride
        </Button>
      </Form>
    </div>
  );
};

export default UpdateRide;
