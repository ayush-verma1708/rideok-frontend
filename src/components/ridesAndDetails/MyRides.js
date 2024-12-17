import React, { useState, useEffect } from 'react';
import { getMyRides } from '../../api/rideApi.js'; // Assuming the API functions are in a separate file
import { Button } from 'react-bootstrap';

const MyRides = ({ onRideSelect }) => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch rides created by the logged-in user
  useEffect(() => {
    const fetchRides = async () => {
      try {
        setLoading(true);
        const response = await getMyRides();
        setRides(response); // Assuming response is an array of rides
      } catch (err) {
        setError('Error fetching rides. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) {
    return <div>Loading your rides...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  const handleRideSelection = (rideId) => {
    console.log(rideId);
    onRideSelect(rideId); // Call the parent handler
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Your Created Rides
      </h2>
      {rides.length === 0 ? (
        <p style={{ textAlign: 'center' }}>
          You have not created any rides yet.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {rides.map((ride) => (
            <div
              key={ride._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f9f9f9',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.05)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            >
              <h3 style={{ fontSize: '18px', color: '#333' }}>
                Ride from <strong>{ride.startLocation}</strong> to{' '}
                <strong>{ride.endLocation}</strong>
              </h3>
              <div style={{ marginBottom: '10px', color: '#777' }}>
                <strong>Driver:</strong> {ride.driver.name} ({ride.driver.email}
                )
              </div>
              <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                <span style={{ color: '#2196F3' }}>
                  Price: ₹{ride.price.toFixed(2)}
                </span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Available Seats:</strong> {ride.availableSeats}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Ride Date:</strong>{' '}
                {new Date(ride.rideDate).toLocaleDateString()}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Passengers:</strong> {ride.passengers.length}
              </div>
              <div style={{ fontWeight: 'bold' }}>
                <span
                  style={{
                    color: ride.availableSeats > 0 ? 'green' : 'red',
                    fontSize: '16px',
                  }}
                >
                  {ride.availableSeats > 0 ? 'Available' : 'Fully Booked'}
                </span>
              </div>

              {/* Select Ride Button */}
              <div style={{ marginTop: '15px' }}>
                <Button
                  variant='primary'
                  onClick={() => handleRideSelection(ride._id)}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRides;
