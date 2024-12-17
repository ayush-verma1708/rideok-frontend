import React from 'react';
import { bookRide } from '../../api/rideApi';
import { Button } from 'react-bootstrap';

const BookRide = ({ rideId }) => {
  const handleBook = async () => {
    try {
      const bookedRide = await bookRide(rideId);
      console.log('Ride booked successfully:', bookedRide);
    } catch (error) {
      console.error('Error booking ride:', error);
    }
  };

  return (
    <Button onClick={handleBook} variant='success'>
      Book Ride
    </Button>
  );
};

export default BookRide;
