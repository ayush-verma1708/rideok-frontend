import React from 'react';
import { deleteRide } from '../../api/rideApi';
import { Button } from 'react-bootstrap';

const DeleteRide = ({ rideId }) => {
  const handleDelete = async () => {
    try {
      const deletedRide = await deleteRide(rideId);
      console.log('Ride deleted successfully:', deletedRide);
    } catch (error) {
      console.error('Error deleting ride:', error);
    }
  };

  return (
    <Button onClick={handleDelete} variant='danger'>
      Delete Ride
    </Button>
  );
};

export default DeleteRide;
