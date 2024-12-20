import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PassengerRideInfo = ({ ride, adjustedPassengerFare, co2Savings }) => {
  return (
    <>
      <Card.Text>
        <strong>Price (Total):</strong> ₹{ride.price.toFixed(2)}
      </Card.Text>
      <Card.Text>
        <strong>Passenger Fare:</strong> ₹{adjustedPassengerFare.toFixed(2)}{' '}
        {co2Savings > 0 && (
          <span className='text-success'>
            (CO2 Savings Discount: ₹{(co2Savings * 5).toFixed(2)})
          </span>
        )}
      </Card.Text>
      <Card.Text>
        <strong>Available Seats:</strong> {ride.availableSeats}
      </Card.Text>
      <Card.Text>
        <strong>Ride Date:</strong>{' '}
        {new Date(ride.rideDate).toLocaleDateString()}
      </Card.Text>
      <Card.Text>
        <strong>Passengers:</strong>{' '}
        {ride.passengers.length > 0 ? ride.passengers.join(', ') : 'None'}
      </Card.Text>

      <Button
        variant='primary'
        className='w-100'
        disabled={ride.availableSeats <= 0}
        style={{
          backgroundColor: ride.availableSeats > 0 ? '#28a745' : '#dc3545',
        }}
      >
        {ride.availableSeats > 0 ? 'Join Ride' : 'Fully Booked'}
      </Button>
    </>
  );
};

export default PassengerRideInfo;
