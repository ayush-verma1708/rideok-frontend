import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Change this import

const RideTile = ({ ride }) => {
  const [selectedRideId, setSelectedRideId] = React.useState(null);
  const navigate = useNavigate(); // Change this line

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  const onRideSelect = (rideId) => {
    console.log(rideId);
    setSelectedRideId(rideId);
    navigate(`/ride/${rideId}`); // Change this line
  };

  return (
    <Card
      style={{
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
      }}
      className='h-100'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onRideSelect(ride._id)}
    >
      <Card.Body>
        <Card.Title className='text-center'>
          Ride from <strong>{ride.startLocation}</strong> to{' '}
          <strong>{ride.endLocation}</strong>
        </Card.Title>
        <Card.Subtitle className='mb-2 text-muted text-center'>
          <strong>Driver:</strong> {ride.driver.name} ({ride.driver.email})
        </Card.Subtitle>
        {/* <Card.Text className='text-center'>
          <strong>Price: ₹{ride.price.toFixed(2)}</strong>
        </Card.Text> */}
        <Card.Text className='text-center'>
          <strong>Available Seats: </strong> {ride.availableSeats}
        </Card.Text>
        <Card.Text className='text-center'>
          <strong>Ride Date: </strong>{' '}
          {new Date(ride.rideDate).toLocaleDateString()}
        </Card.Text>
        <Card.Text className='text-center'>
          <strong>Passengers: </strong> {ride.passengers.length}
        </Card.Text>
        <div className='text-center'>
          <span
            style={{
              color: ride.availableSeats > 0 ? 'green' : 'red',
              fontWeight: 'bold',
            }}
          >
            {ride.availableSeats > 0 ? 'Available' : 'Fully Booked'}
          </span>
        </div>
      </Card.Body>
      <Card.Footer className='text-center'>
        <Button
          variant='primary'
          onClick={() => onRideSelect(ride._id)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#2196F3',
            borderColor: '#2196F3',
            color: 'white',
          }}
        >
          Select Ride
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default RideTile;
