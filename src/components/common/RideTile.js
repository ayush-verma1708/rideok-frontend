import React, { useEffect, useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RideTile = ({ ride, currentUser, onSelectRide, showDriver = true }) => {
  const navigate = useNavigate();

  // Format time to Indian style (DD-MM-YYYY HH:mm:ss)
  const formatIndianTime = (date) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    const newDate = new Date(date);
    return newDate.toLocaleString('en-IN', options);
  };
  // Format the ride's time using ride.rideTime
  const formattedRideTime = formatIndianTime(ride.rideTime); // Ride's formatted time

  // Calculate the countdown
  const [countdown, setCountdown] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const rideTime = new Date(ride.rideTime); // Assuming ride.time is a valid date string or timestamp
      const difference = rideTime - now;

      if (difference <= 0) {
        setCountdown('Ride has started');
        clearInterval(interval); // Stop the countdown once the ride has started
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        // const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown(`${hours}h ${minutes}m `);
      }
    }, 1000); // Update every second

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [ride.time]); // Recalculate countdown when ride.time changes

  const getUserStatus = () => {
    if (!currentUser) {
      console.log('User is not logged in.');
      return 'notLoggedIn';
    }

    // Ensure driver ID and current user ID are both strings before comparison
    if (String(ride.driver?._id) === String(currentUser?._id)) {
      return 'driver';
    }

    // Check if the current user is a passenger
    const isPassenger = ride.passengers?.some((p) => {
      const match = String(p.user?._id) === String(currentUser?._id); // Ensure both IDs are strings
      if (match) {
      }
      return match;
    });

    if (isPassenger) return 'passenger';

    // Check if the current user has made a request for the ride
    const isRequested = ride.customerRequests?.some((req) => {
      const match = String(req.user) === String(currentUser?._id); // Ensure both IDs are strings

      if (match) {
      }
      return match;
    });

    if (isRequested) return 'requested';

    return null;
  };

  const userStatus = getUserStatus();

  const getRideStatus = () => {
    if (ride.isExpired) return { text: 'Expired', variant: 'secondary' };
    if (ride.availableSeats === 0)
      return { text: 'Fully Booked', variant: 'danger' };
    return { text: 'Available', variant: 'success' };
  };

  const { text: statusText, variant: statusVariant } = getRideStatus();

  const handleSelectRide = () => {
    if (onSelectRide) onSelectRide(ride._id);
    else navigate(`/ride/${ride._id}`);
  };

  return (
    <Card
      style={{
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        backgroundColor: ride.isExpired ? '#f8f9fa' : 'white',
        opacity: ride.isExpired ? 0.8 : 1,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <Card.Body>
        <Card.Title className='text-center'>
          Ride from <strong>{ride.startLocation || 'Unknown'}</strong> to{' '}
          <strong>{ride.endLocation || 'Unknown'}</strong>
        </Card.Title>
        <div className='text-center mb-3'>
          <Badge bg={statusVariant} style={{ fontSize: '1rem' }}>
            {statusText}
          </Badge>
        </div>
        {/* Countdown Timer */}
        <div className='text-center mb-3'>
          <strong>Time Left: </strong>
          <span>{countdown}</span>
        </div>
        {/* Display ride's ridetime in Indian format */}
        <div className='text-center mb-3'>
          <strong>Ride Date: </strong>
          <span>
            {new Date(ride.rideDate).toLocaleString('en-IN', {
              day: '2-digit',
              month: '2-digit',
            })}
          </span>
        </div>

        {/* Display ride's ridetime in Indian format */}
        <div className='text-center mb-3'>
          <strong>Ride Time: </strong>
          <span>{formattedRideTime}</span> {/* Display formatted ride time */}
        </div>

        {showDriver && (
          <Card.Text className='text-center'>
            <strong>Car captain: </strong> {ride?.driver?.name || 'N/A'}
          </Card.Text>
        )}
        <Card.Text className='text-center'>
          <strong>Available Seats: </strong> {ride.availableSeats}
        </Card.Text>
        {userStatus === 'notLoggedIn' && (
          <p className='text-center text-danger'>
            Please <strong>log in</strong> to view more details and join this
            ride.
          </p>
        )}
        {userStatus === 'driver' && (
          <p className='text-center text-success'>You created this ride.</p>
        )}
        {userStatus === 'passenger' && (
          <p className='text-center text-primary'>
            You have confirmed a seat on this ride.
          </p>
        )}
        {userStatus === 'requested' && (
          <p className='text-center text-warning'>
            You have requested this ride. Please wait for the Car captain to
            reach out to you.
          </p>
        )}
      </Card.Body>
      <Card.Footer className='text-center'>
        {userStatus === 'notLoggedIn' ? (
          <Button
            variant='primary'
            onClick={() => navigate('/onboarding')}
            style={{ width: '100%' }}
          >
            Log In to Join Ride
          </Button>
        ) : (
          <Button
            variant='primary'
            onClick={handleSelectRide}
            style={{ width: '100%' }}
          >
            View Ride Details
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default RideTile;
