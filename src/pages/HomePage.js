import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [rides, setRides] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch available rides from the server
    fetch('/api/rides')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        if (
          response.headers.get('content-type')?.includes('application/json')
        ) {
          return response.json();
        } else {
          throw new Error('Response was not JSON');
        }
      })
      .then((data) => setRides(data))
      .catch((error) => {
        console.error('Error fetching rides:', error);
        setError(error.message);
      });
  }, []);

  return (
    <div className='container'>
      <h1>Welcome to RideOk</h1>
      {user && <h2>Hello, {user.name}!</h2>}
      <div className='rides'>
        <h3>Available Rides</h3>
        {error ? (
          <p>Error: {error}</p>
        ) : rides.length === 0 ? (
          <p>No rides available at the moment.</p>
        ) : (
          <ul>
            {rides.map((ride) => (
              <li key={ride.id}>
                {ride.origin} to {ride.destination} at {ride.time}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={() => (window.location.href = '/create-ride')}>
        Create New Ride
      </button>
    </div>
  );
};

export default HomePage;
