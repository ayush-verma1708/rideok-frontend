import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spinner, Row, Col, Button } from 'react-bootstrap';
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

  const calculateFare = (ride) => {
    const totalFare = ride.price; // Total fare for the ride
    const availableSeats = ride.availableSeats;
    const totalPeople = availableSeats + 1; // Total people (driver + passengers)

    // Base cost per passenger
    const baseFarePerPassenger = totalFare / totalPeople;

    // Driver's share (smaller share, since they're the ride creator)
    const driverShare = baseFarePerPassenger * 0.7; // The driver pays 70% of the base fare

    // Passengers' share (remainder of the total fare)
    const passengerFare = baseFarePerPassenger * 1.3; // Passengers pay the remaining 30%

    // Optional: CO2 savings (as a discount)
    const co2Savings = ride.co2Savings || 0;
    const co2Discount = co2Savings > 0 ? co2Savings * 5 : 0; // e.g., 5 INR per kg of CO2 saved

    // Adjust the passenger fare based on the CO2 savings
    const adjustedPassengerFare = passengerFare - co2Discount;

    // Return the breakdown of fares
    return {
      driverShare,
      passengerFare: adjustedPassengerFare,
      totalFare,
      co2Savings,
      adjustedPassengerFare,
    };
  };

  if (loading) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!ride) {
    return <div className='text-center'>Ride not found</div>;
  }

  const {
    driverShare,
    passengerFare,
    totalFare,
    co2Savings,
    adjustedPassengerFare,
  } = calculateFare(ride);

  return (
    <div className='container my-5'>
      <Card className='shadow-sm rounded'>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Card.Title className='text-center mb-3'>
                <strong>Ride Details</strong>
              </Card.Title>
              <Card.Subtitle className='mb-2 text-muted text-center'>
                <strong>Driver:</strong> {ride.driver.name} <br />
                <small>({ride.driver.email})</small>
              </Card.Subtitle>
              <Card.Text>
                <strong>Price (Total):</strong> ₹{totalFare.toFixed(2)}
              </Card.Text>
              <Card.Text>
                <strong>Driver's Share:</strong> ₹{driverShare.toFixed(2)}
              </Card.Text>
              <Card.Text>
                <strong>Passenger Fare:</strong> ₹
                {adjustedPassengerFare.toFixed(2)}{' '}
                {co2Savings > 0 && (
                  <span className='text-success'>
                    (CO2 Savings: ₹{co2Savings * 5})
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
                <strong>CO2 Savings:</strong> {ride.co2Savings || 'N/A'} kg
              </Card.Text>
              <Card.Text>
                <strong>Passengers:</strong>{' '}
                {ride.passengers.length > 0
                  ? ride.passengers.join(', ')
                  : 'None'}
              </Card.Text>
              <Button
                variant='primary'
                className='w-100'
                disabled={ride.availableSeats <= 0}
                style={{
                  backgroundColor:
                    ride.availableSeats > 0 ? '#28a745' : '#dc3545',
                }}
              >
                {ride.availableSeats > 0 ? 'Join Ride' : 'Fully Booked'}
              </Button>
            </Col>

            <Col md={6}>
              <RideMapView
                startLocation={ride.startLocation}
                endLocation={ride.endLocation}
              />
            </Col>
          </Row>

          <div className='text-center mt-4'>
            <span
              style={{
                color: ride.availableSeats > 0 ? 'green' : 'red',
                fontWeight: 'bold',
                fontSize: '1.2em',
              }}
            >
              {ride.availableSeats > 0 ? 'Seats Available ' : 'Fully Booked'}
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RideInfo;
