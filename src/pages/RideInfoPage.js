import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spinner } from 'react-bootstrap';
import { getRideDetails } from '../api/rideApi.js';
import RideMapView from '../components/RideMap/RideMapView'; // Import the map view component

const RideInfo = () => {
  const { id } = useParams(); // Get the ride ID from the URL
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const rideData = await getRideDetails(id);
        setRide(rideData);
      } catch (error) {
        console.error('Error fetching ride details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRideDetails();
  }, [id]);

  if (loading) {
    return (
      <div className='text-center'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!ride) {
    return <div className='text-center'>Ride not found</div>;
  }

  return (
    <Card
      style={{
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '20px auto',
        maxWidth: '600px',
        padding: '20px',
      }}
    >
      <Card.Body>
        <Card.Title className='text-center'>
          Ride from <strong>{ride.startLocation}</strong> to{' '}
          <strong>{ride.endLocation}</strong>
        </Card.Title>
        <Card.Subtitle className='mb-2 text-muted text-center'>
          <strong>Driver:</strong> {ride.driver.name} ({ride.driver.email})
        </Card.Subtitle>
        <Card.Text>
          <strong>Price:</strong> ₹{ride.price.toFixed(2)}
        </Card.Text>
        <Card.Text>
          <strong>Available Seats:</strong> {ride.availableSeats}
        </Card.Text>
        <Card.Text>
          <strong>Ride Date:</strong>{' '}
          {new Date(ride.rideDate).toLocaleDateString()}
        </Card.Text>
        <Card.Text>
          <strong>Passengers:</strong> {ride.passengers.join(', ')}
        </Card.Text>
        <Card.Text>
          <strong>CO2 Savings:</strong> {ride.co2Savings} kg
        </Card.Text>
        <RideMapView
          startLocation={ride.startLocation}
          endLocation={ride.endLocation}
        />
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
    </Card>
  );
};

export default RideInfo;
