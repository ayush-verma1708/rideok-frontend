import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Spinner, Card } from 'react-bootstrap'; // For loading indicator and card

// Bootstrap icons can be used directly by adding them to the JSX
const RideMapView = ({ startLocation, endLocation }) => {
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';
    const ORS_API_KEY =
      '5b3ce3597851110001cf62483628cb4427c2430b96c354f4d63058fd'; // Replace with your API key

    const getCoordinates = async (location) => {
      try {
        const response = await axios.get(NOMINATIM_API_URL, {
          params: { q: location, format: 'json' },
        });
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          return { lat: parseFloat(lat), lon: parseFloat(lon) };
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
      return null;
    };

    const initializeMap = async () => {
      const startCoords = await getCoordinates(startLocation);
      const endCoords = await getCoordinates(endLocation);

      if (startCoords && endCoords) {
        if (!mapRef.current) {
          mapRef.current = L.map('map').setView(
            [startCoords.lat, startCoords.lon],
            10
          );

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(mapRef.current);

          const routeResponse = await axios.get(
            'https://api.openrouteservice.org/v2/directions/driving-car',
            {
              params: {
                api_key: ORS_API_KEY,
                start: `${startCoords.lon},${startCoords.lat}`,
                end: `${endCoords.lon},${endCoords.lat}`,
              },
            }
          );

          const routeCoords =
            routeResponse.data.features[0].geometry.coordinates;
          const latLngs = routeCoords.map(([lon, lat]) => [lat, lon]);

          L.polyline(latLngs, { color: 'blue', weight: 5 }).addTo(
            mapRef.current
          );

          // Add Bootstrap Icons for start and end markers
          const startMarker = L.marker([
            startCoords.lat,
            startCoords.lon,
          ]).addTo(mapRef.current);
          startMarker.bindPopup(
            `<i class="bi bi-geo-alt" style="color: green; font-size: 24px;"></i><br /><strong>Start: ${startLocation}</strong>`
          );

          const endMarker = L.marker([endCoords.lat, endCoords.lon]).addTo(
            mapRef.current
          );
          endMarker.bindPopup(
            `<i class="bi bi-geo-alt" style="color: red; font-size: 24px;"></i><br /><strong>End: ${endLocation}</strong>`
          );

          // Adjust the map view to fit the route and markers
          mapRef.current.fitBounds([
            startMarker.getLatLng(),
            endMarker.getLatLng(),
          ]);

          setLoading(false); // Hide loading spinner
        }
      }
    };

    initializeMap();

    // Cleanup function to remove the map on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [startLocation, endLocation]);

  return (
    <div style={{ position: 'relative', height: '500px', width: '100%' }}>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Spinner animation='border' role='status' />
        </div>
      )}
      <div id='map' style={{ height: '100%', width: '100%' }} />
      {!loading && (
        <Card
          style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Card.Body>
            <Card.Title className='text-center'>Ride Route</Card.Title>
            <Card.Text>
              <strong>From:</strong> {startLocation}
            </Card.Text>
            <Card.Text>
              <strong>To:</strong> {endLocation}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default RideMapView;

// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { Spinner } from 'react-bootstrap'; // For loading indicator

// const RideMapView = ({ startLocation, endLocation }) => {
//   const mapRef = useRef(null);
//   const [loading, setLoading] = useState(true); // Loading state

//   useEffect(() => {
//     const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';
//     const ORS_API_KEY =
//       '5b3ce3597851110001cf62483628cb4427c2430b96c354f4d63058fd'; // Replace with your API key

//     const getCoordinates = async (location) => {
//       try {
//         const response = await axios.get(NOMINATIM_API_URL, {
//           params: { q: location, format: 'json' },
//         });
//         if (response.data.length > 0) {
//           const { lat, lon } = response.data[0];
//           return { lat: parseFloat(lat), lon: parseFloat(lon) };
//         }
//       } catch (error) {
//         console.error('Error fetching coordinates:', error);
//       }
//       return null;
//     };

//     const initializeMap = async () => {
//       const startCoords = await getCoordinates(startLocation);
//       const endCoords = await getCoordinates(endLocation);

//       if (startCoords && endCoords) {
//         if (!mapRef.current) {
//           mapRef.current = L.map('map').setView(
//             [startCoords.lat, startCoords.lon],
//             10
//           );

//           L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             maxZoom: 19,
//           }).addTo(mapRef.current);

//           const routeResponse = await axios.get(
//             'https://api.openrouteservice.org/v2/directions/driving-car',
//             {
//               params: {
//                 api_key: ORS_API_KEY,
//                 start: `${startCoords.lon},${startCoords.lat}`,
//                 end: `${endCoords.lon},${endCoords.lat}`,
//               },
//             }
//           );

//           const routeCoords =
//             routeResponse.data.features[0].geometry.coordinates;
//           const latLngs = routeCoords.map(([lon, lat]) => [lat, lon]);

//           L.polyline(latLngs, { color: 'blue', weight: 5 }).addTo(
//             mapRef.current
//           );

//           // Add custom markers for start and end locations
//           const startMarker = L.marker([startCoords.lat, startCoords.lon], {
//             icon: L.icon({
//               iconUrl: '/path/to/start-icon.png', // Add a custom marker icon
//               iconSize: [25, 41],
//               iconAnchor: [12, 41],
//             }),
//           }).addTo(mapRef.current);

//           const endMarker = L.marker([endCoords.lat, endCoords.lon], {
//             icon: L.icon({
//               iconUrl: '/path/to/end-icon.png', // Add a custom marker icon
//               iconSize: [25, 41],
//               iconAnchor: [12, 41],
//             }),
//           }).addTo(mapRef.current);

//           // Adjust the map view to fit the route and markers
//           mapRef.current.fitBounds([
//             startMarker.getLatLng(),
//             endMarker.getLatLng(),
//           ]);

//           setLoading(false); // Hide loading spinner
//         }
//       }
//     };

//     initializeMap();

//     // Cleanup function to remove the map on unmount
//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, [startLocation, endLocation]);

//   return (
//     <div style={{ position: 'relative', height: '500px', width: '100%' }}>
//       {loading && (
//         <div
//           style={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//           }}
//         >
//           <Spinner animation='border' role='status' />
//         </div>
//       )}
//       <div id='map' style={{ height: '100%', width: '100%' }} />
//     </div>
//   );
// };

// export default RideMapView;

// // import React, { useEffect, useRef } from 'react';
// // import axios from 'axios';
// // import L from 'leaflet';
// // import 'leaflet/dist/leaflet.css';

// // const RideMapView = ({ startLocation, endLocation }) => {
// //   const mapRef = useRef(null);

// //   useEffect(() => {
// //     const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';
// //     const ORS_API_KEY =
// //       '5b3ce3597851110001cf62483628cb4427c2430b96c354f4d63058fd'; // Replace with your API key

// //     const getCoordinates = async (location) => {
// //       try {
// //         const response = await axios.get(NOMINATIM_API_URL, {
// //           params: { q: location, format: 'json' },
// //         });
// //         if (response.data.length > 0) {
// //           const { lat, lon } = response.data[0];
// //           return { lat: parseFloat(lat), lon: parseFloat(lon) };
// //         }
// //       } catch (error) {
// //         console.error('Error fetching coordinates:', error);
// //       }
// //       return null;
// //     };

// //     const initializeMap = async () => {
// //       const startCoords = await getCoordinates(startLocation);
// //       const endCoords = await getCoordinates(endLocation);

// //       if (startCoords && endCoords) {
// //         if (!mapRef.current) {
// //           // Initialize the map only once
// //           mapRef.current = L.map('map').setView(
// //             [startCoords.lat, startCoords.lon],
// //             10
// //           );

// //           L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //             maxZoom: 19,
// //           }).addTo(mapRef.current);

// //           const routeResponse = await axios.get(
// //             'https://api.openrouteservice.org/v2/directions/driving-car',
// //             {
// //               params: {
// //                 api_key: ORS_API_KEY,
// //                 start: `${startCoords.lon},${startCoords.lat}`,
// //                 end: `${endCoords.lon},${endCoords.lat}`,
// //               },
// //             }
// //           );

// //           const routeCoords =
// //             routeResponse.data.features[0].geometry.coordinates;
// //           const latLngs = routeCoords.map(([lon, lat]) => [lat, lon]);

// //           L.polyline(latLngs, { color: 'blue', weight: 5 }).addTo(
// //             mapRef.current
// //           );
// //         }
// //       }
// //     };

// //     initializeMap();

// //     // Cleanup function to remove the map on unmount
// //     return () => {
// //       if (mapRef.current) {
// //         mapRef.current.remove();
// //         mapRef.current = null;
// //       }
// //     };
// //   }, [startLocation, endLocation]);

// //   return <div id='map' style={{ height: '500px', width: '100%' }} />;
// // };

// // export default RideMapView;
