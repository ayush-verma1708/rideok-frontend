import React, { useState } from 'react';
import {
  LoadScript,
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';

const MapComponent = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [directions, setDirections] = useState(null);

  const handleCalculateDistance = () => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        }
      }
    );
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Start Location'
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type='text'
        placeholder='End Location'
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <button onClick={handleCalculateDistance}>Calculate Distance</button>

      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ height: '400px', width: '100%' }}
          zoom={14}
          center={{ lat: 40.748817, lng: -73.985428 }}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
