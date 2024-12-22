import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Spinner, Card, Form, Button } from 'react-bootstrap'; // For loading indicator, card, and form elements
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const RideMapView = ({ startLocation, endLocation }) => {
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [query, setQuery] = useState(''); // State for search query
  const [routeOptions, setRouteOptions] = useState({
    avoidHighways: false,
    avoidTolls: false,
  });
  const [showRouteInfo, setShowRouteInfo] = useState(true); // State to toggle route info panel visibility
  const [showSearchPanel, setShowSearchPanel] = useState(true); // State to toggle search panel visibility

  const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';
  const ORS_API_KEY =
    '5b3ce3597851110001cf62483628cb4427c2430b96c354f4d63058fd'; // Replace with your API key

  const sliceAfterCommas = (sentence) => {
    // Split the sentence by commas and take the first 3 parts
    const parts = sentence.split(',');
    return parts.slice(0, 3).join(', ');
  };

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

  useEffect(() => {
    const initializeMap = async () => {
      const startCoords = await getCoordinates(startLocation);
      const endCoords = await getCoordinates(endLocation);

      if (startCoords && endCoords) {
        if (!mapRef.current) {
          mapRef.current = L.map('map').setView(
            [startCoords.lat, startCoords.lon],
            10
          );

          // Custom Map Style (can be changed to match branding)
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(mapRef.current);

          // Request Route from OpenRouteService API
          const routeResponse = await axios.get(
            'https://api.openrouteservice.org/v2/directions/driving-car',
            {
              params: {
                api_key: ORS_API_KEY,
                start: `${startCoords.lon},${startCoords.lat}`,
                end: `${endCoords.lon},${endCoords.lat}`,
                avoid: routeOptions.avoidHighways ? 'highways' : '',
                avoid_tolls: routeOptions.avoidTolls ? 'true' : 'false',
              },
            }
          );

          const routeCoords =
            routeResponse.data.features[0].geometry.coordinates;
          const latLngs = routeCoords.map(([lon, lat]) => [lat, lon]);

          // Thicker and highlighted polyline for the route
          L.polyline(latLngs, {
            color: 'blue',
            weight: 6,
            opacity: 0.7,
          }).addTo(mapRef.current);

          // Custom icons for start and end using images (can be replaced with your own images)
          const startIcon = L.icon({
            iconUrl: '/start.png', // Ensure the image exists
            iconSize: [30, 30],
            iconAnchor: [15, 30],
          });

          const endIcon = L.icon({
            iconUrl: '/end.png', // Ensure the image exists
            iconSize: [30, 30],
            iconAnchor: [15, 30],
          });

          // Add markers with custom icons
          const startMarker = L.marker([startCoords.lat, startCoords.lon], {
            icon: startIcon,
          }).addTo(mapRef.current);
          startMarker.bindPopup(`<strong>Start: ${startLocation}</strong>`);

          const endMarker = L.marker([endCoords.lat, endCoords.lon], {
            icon: endIcon,
          }).addTo(mapRef.current);
          endMarker.bindPopup(`<strong>End: ${endLocation}</strong>`);

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
  }, [startLocation, endLocation, routeOptions]);

  // useEffect(() => {
  //   initializeMap();

  //   // Cleanup function to remove the map on unmount
  //   return () => {
  //     if (mapRef.current) {
  //       mapRef.current.remove();
  //       mapRef.current = null;
  //     }
  //   };
  // }, [startLocation, endLocation, routeOptions]);

  // Search function to center the map based on search input

  const handleSearch = async () => {
    const { lat, lon } = await getCoordinates(query);
    if (lat && lon) {
      mapRef.current.setView([lat, lon], 13);
    }
  };

  // Handle form changes for route options
  const handleRouteOptionChange = (e) => {
    setRouteOptions({
      ...routeOptions,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div style={{ position: 'relative', height: '500px' }}>
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
      {/* Map container */}
      <div
        id='map'
        style={{
          height: '100%',
          width: '100%',
          zIndex: 0, // Ensure the map is behind other elements
        }}
      />

      {/* Toggle Button */}
      <Button
        onClick={() => {
          setShowRouteInfo(!showRouteInfo);
          setShowSearchPanel(!showSearchPanel);
        }}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1,
        }}
      >
        {showRouteInfo && showSearchPanel ? 'Hide Panels' : 'Show Panels'}
      </Button>

      {/* Route Information Card */}
      {showRouteInfo && !loading && (
        <Card
          style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '8px 16px',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
            maxWidth: '90%', // Ensures the card fits within a small box
            minWidth: '250px', // Provides a sensible minimum width
            textAlign: 'center', // Centers the content for a clean layout
            zIndex: 10, // Ensures it stays above other elements if needed
          }}
        >
          <Card.Body>
            <Card.Title className='text-center'>Ride Route</Card.Title>
            <Card.Text>
              <strong>From:</strong> {sliceAfterCommas(startLocation)}
            </Card.Text>
            <Card.Text>
              <strong>To:</strong> {sliceAfterCommas(endLocation)}
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      {/* Search and Route Options */}
      {showSearchPanel && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px', // Position at the bottom of the map
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            width: '80%', // Adjust width as needed
          }}
        >
          {/* Search Bar */}
          <div style={{ marginBottom: '10px' }}>
            <FontAwesomeIcon icon={faSearch} />
            <input
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search location'
              style={{
                marginLeft: '10px',
                padding: '5px',
                width: '200px',
                borderRadius: '5px',
                zIndex: 1000,
              }}
            />
            <Button onClick={handleSearch} variant='outline-primary'>
              Search
            </Button>
          </div>

          {/* Route Options Form */}
          <Form>
            <Form.Check
              type='checkbox'
              label='Avoid Highways'
              name='avoidHighways'
              checked={routeOptions.avoidHighways}
              onChange={handleRouteOptionChange}
            />
            <Form.Check
              type='checkbox'
              label='Avoid Tolls'
              name='avoidTolls'
              checked={routeOptions.avoidTolls}
              onChange={handleRouteOptionChange}
            />
          </Form>
        </div>
      )}
    </div>
  );
};

export default RideMapView;

// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { Spinner, Card, Form, Button } from 'react-bootstrap'; // For loading indicator, card, and form elements
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';

// const RideMapView = ({ startLocation, endLocation }) => {
//   const mapRef = useRef(null);
//   const [loading, setLoading] = useState(true); // Loading state
//   const [query, setQuery] = useState(''); // State for search query
//   const [routeOptions, setRouteOptions] = useState({
//     avoidHighways: false,
//     avoidTolls: false,
//   });

//   const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';
//   const ORS_API_KEY =
//     '5b3ce3597851110001cf62483628cb4427c2430b96c354f4d63058fd'; // Replace with your API key

//   const getCoordinates = async (location) => {
//     try {
//       const response = await axios.get(NOMINATIM_API_URL, {
//         params: { q: location, format: 'json' },
//       });
//       if (response.data.length > 0) {
//         const { lat, lon } = response.data[0];
//         return { lat: parseFloat(lat), lon: parseFloat(lon) };
//       }
//     } catch (error) {
//       console.error('Error fetching coordinates:', error);
//     }
//     return null;
//   };

//   const initializeMap = async () => {
//     const startCoords = await getCoordinates(startLocation);
//     const endCoords = await getCoordinates(endLocation);

//     if (startCoords && endCoords) {
//       if (!mapRef.current) {
//         mapRef.current = L.map('map').setView(
//           [startCoords.lat, startCoords.lon],
//           10
//         );

//         // Custom Map Style (can be changed to match branding)
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           maxZoom: 19,
//         }).addTo(mapRef.current);

//         // Traffic Layer (for real-time updates)
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           maxZoom: 19,
//           attribution: 'OpenStreetMap',
//         }).addTo(mapRef.current);

//         // Request Route from OpenRouteService API
//         const routeResponse = await axios.get(
//           'https://api.openrouteservice.org/v2/directions/driving-car',
//           {
//             params: {
//               api_key: ORS_API_KEY,
//               start: `${startCoords.lon},${startCoords.lat}`,
//               end: `${endCoords.lon},${endCoords.lat}`,
//               avoid: routeOptions.avoidHighways ? 'highways' : '',
//               avoid_tolls: routeOptions.avoidTolls ? 'true' : 'false',
//             },
//           }
//         );

//         const routeCoords = routeResponse.data.features[0].geometry.coordinates;
//         const latLngs = routeCoords.map(([lon, lat]) => [lat, lon]);

//         // Thicker and highlighted polyline for the route
//         L.polyline(latLngs, {
//           color: 'orange',
//           weight: 6,
//           opacity: 0.7,
//         }).addTo(mapRef.current);

//         // Custom icons for start and end using images (can be replaced with your own images)
//         const startIcon = L.icon({
//           iconUrl: '/start.png', // Ensure the image exists
//           iconSize: [30, 30],
//           iconAnchor: [15, 30],
//         });

//         const endIcon = L.icon({
//           iconUrl: '/end.png', // Ensure the image exists
//           iconSize: [30, 30],
//           iconAnchor: [15, 30],
//         });

//         // Add markers with custom icons
//         const startMarker = L.marker([startCoords.lat, startCoords.lon], {
//           icon: startIcon,
//         }).addTo(mapRef.current);
//         startMarker.bindPopup(`<strong>Start: ${startLocation}</strong>`);

//         const endMarker = L.marker([endCoords.lat, endCoords.lon], {
//           icon: endIcon,
//         }).addTo(mapRef.current);
//         endMarker.bindPopup(`<strong>End: ${endLocation}</strong>`);

//         // Adjust the map view to fit the route and markers
//         mapRef.current.fitBounds([
//           startMarker.getLatLng(),
//           endMarker.getLatLng(),
//         ]);

//         setLoading(false); // Hide loading spinner
//       }
//     }
//   };

//   useEffect(() => {
//     initializeMap();

//     // Cleanup function to remove the map on unmount
//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, [startLocation, endLocation, routeOptions]);

//   // Search function to center the map based on search input
//   const handleSearch = async () => {
//     const { lat, lon } = await getCoordinates(query);
//     if (lat && lon) {
//       mapRef.current.setView([lat, lon], 13);
//     }
//   };

//   // Handle form changes for route options
//   const handleRouteOptionChange = (e) => {
//     setRouteOptions({
//       ...routeOptions,
//       [e.target.name]: e.target.checked,
//     });
//   };

//   // Handle Enter key press to trigger search
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   return (
//     <div style={{ position: 'relative', height: '500px' }}>
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
//       {/* Map container */}
//       <div
//         id='map'
//         style={{
//           height: '100%',
//           width: '100%',
//           zIndex: 0, // Ensure the map is behind other elements
//         }}
//       />

//       {/* Route Information Card */}
//       {!loading && (
//         <Card
//           style={{
//             position: 'absolute',
//             top: '10px',
//             left: '50%',
//             transform: 'translateX(-50%)',
//             backgroundColor: 'rgba(255, 255, 255, 0.8)',
//             padding: '10px',
//             borderRadius: '10px',
//             boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
//           }}
//         >
//           <Card.Body>
//             <Card.Title className='text-center'>Ride Route</Card.Title>
//             <Card.Text>
//               <strong>From:</strong> {startLocation}
//             </Card.Text>
//             <Card.Text>
//               <strong>To:</strong> {endLocation}
//             </Card.Text>
//           </Card.Body>
//         </Card>
//       )}

//       {/* Bottom Container for Search Bar and Route Options */}
//       <div
//         style={{
//           position: 'absolute',
//           bottom: '20px', // Position at the bottom of the map
//           left: '50%',
//           transform: 'translateX(-50%)',
//           background: 'white',
//           padding: '20px',
//           borderRadius: '10px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
//           width: '80%', // Adjust width as needed
//         }}
//       >
//         {/* Search Bar */}
//         <div style={{ marginBottom: '10px' }}>
//           <FontAwesomeIcon icon={faSearch} />
//           <input
//             type='text'
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyPress={handleKeyPress} // Listen for Enter key press
//             placeholder='Search location'
//             style={{
//               marginLeft: '10px',
//               padding: '5px',
//               width: '200px',
//               borderRadius: '5px',
//             }}
//           />
//           <Button onClick={handleSearch} variant='outline-primary'>
//             Search
//           </Button>
//         </div>

//         {/* Route Options Form */}
//         <Form>
//           <Form.Check
//             type='checkbox'
//             label='Avoid Highways'
//             name='avoidHighways'
//             checked={routeOptions.avoidHighways}
//             onChange={handleRouteOptionChange}
//           />
//           <Form.Check
//             type='checkbox'
//             label='Avoid Tolls'
//             name='avoidTolls'
//             checked={routeOptions.avoidTolls}
//             onChange={handleRouteOptionChange}
//           />
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default RideMapView;

// // import React, { useEffect, useRef, useState } from 'react';
// // import axios from 'axios';
// // import L from 'leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import { Spinner, Card, Form, Button } from 'react-bootstrap'; // For loading indicator, card, and form elements
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faSearch } from '@fortawesome/free-solid-svg-icons';

// // const RideMapView = ({ startLocation, endLocation }) => {
// //   const mapRef = useRef(null);
// //   const [loading, setLoading] = useState(true); // Loading state
// //   const [query, setQuery] = useState(''); // State for search query
// //   const [routeOptions, setRouteOptions] = useState({
// //     avoidHighways: false,
// //     avoidTolls: false,
// //   });

// //   const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';
// //   const ORS_API_KEY =
// //     '5b3ce3597851110001cf62483628cb4427c2430b96c354f4d63058fd'; // Replace with your API key

// //   const getCoordinates = async (location) => {
// //     try {
// //       const response = await axios.get(NOMINATIM_API_URL, {
// //         params: { q: location, format: 'json' },
// //       });
// //       if (response.data.length > 0) {
// //         const { lat, lon } = response.data[0];
// //         return { lat: parseFloat(lat), lon: parseFloat(lon) };
// //       }
// //     } catch (error) {
// //       console.error('Error fetching coordinates:', error);
// //     }
// //     return null;
// //   };

// //   const initializeMap = async () => {
// //     const startCoords = await getCoordinates(startLocation);
// //     const endCoords = await getCoordinates(endLocation);

// //     if (startCoords && endCoords) {
// //       if (!mapRef.current) {
// //         mapRef.current = L.map('map').setView(
// //           [startCoords.lat, startCoords.lon],
// //           10
// //         );

// //         // Custom Map Style (can be changed to match branding)
// //         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //           maxZoom: 19,
// //         }).addTo(mapRef.current);

// //         // Traffic Layer (for real-time updates)
// //         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //           maxZoom: 19,
// //           attribution: 'OpenStreetMap',
// //         }).addTo(mapRef.current);

// //         // Request Route from OpenRouteService API
// //         const routeResponse = await axios.get(
// //           'https://api.openrouteservice.org/v2/directions/driving-car',
// //           {
// //             params: {
// //               api_key: ORS_API_KEY,
// //               start: `${startCoords.lon},${startCoords.lat}`,
// //               end: `${endCoords.lon},${endCoords.lat}`,
// //               avoid: routeOptions.avoidHighways ? 'highways' : '',
// //               avoid_tolls: routeOptions.avoidTolls ? 'true' : 'false',
// //             },
// //           }
// //         );

// //         const routeCoords = routeResponse.data.features[0].geometry.coordinates;
// //         const latLngs = routeCoords.map(([lon, lat]) => [lat, lon]);

// //         // Thicker and highlighted polyline for the route
// //         L.polyline(latLngs, {
// //           color: 'orange',
// //           weight: 6,
// //           opacity: 0.7,
// //         }).addTo(mapRef.current);

// //         // Custom icons for start and end using images (can be replaced with your own images)
// //         const startIcon = L.icon({
// //           iconUrl: '/start.png', // Ensure the image exists
// //           iconSize: [30, 30],
// //           iconAnchor: [15, 30],
// //         });

// //         const endIcon = L.icon({
// //           iconUrl: '/end.png', // Ensure the image exists
// //           iconSize: [30, 30],
// //           iconAnchor: [15, 30],
// //         });

// //         // Add markers with custom icons
// //         const startMarker = L.marker([startCoords.lat, startCoords.lon], {
// //           icon: startIcon,
// //         }).addTo(mapRef.current);
// //         startMarker.bindPopup(`<strong>Start: ${startLocation}</strong>`);

// //         const endMarker = L.marker([endCoords.lat, endCoords.lon], {
// //           icon: endIcon,
// //         }).addTo(mapRef.current);
// //         endMarker.bindPopup(`<strong>End: ${endLocation}</strong>`);

// //         // Adjust the map view to fit the route and markers
// //         mapRef.current.fitBounds([
// //           startMarker.getLatLng(),
// //           endMarker.getLatLng(),
// //         ]);

// //         setLoading(false); // Hide loading spinner
// //       }
// //     }
// //   };

// //   useEffect(() => {
// //     initializeMap();

// //     // Cleanup function to remove the map on unmount
// //     return () => {
// //       if (mapRef.current) {
// //         mapRef.current.remove();
// //         mapRef.current = null;
// //       }
// //     };
// //   }, [startLocation, endLocation, routeOptions]);

// //   // Search function to center the map based on search input
// //   const handleSearch = async () => {
// //     const { lat, lon } = await getCoordinates(query);
// //     if (lat && lon) {
// //       mapRef.current.setView([lat, lon], 13);
// //     }
// //   };

// //   // Handle form changes for route options
// //   const handleRouteOptionChange = (e) => {
// //     setRouteOptions({
// //       ...routeOptions,
// //       [e.target.name]: e.target.checked,
// //     });
// //   };

// //   return (
// //     <div style={{ position: 'relative', height: '500px' }}>
// //       {loading && (
// //         <div
// //           style={{
// //             position: 'absolute',
// //             top: '50%',
// //             left: '50%',
// //             transform: 'translate(-50%, -50%)',
// //           }}
// //         >
// //           <Spinner animation='border' role='status' />
// //         </div>
// //       )}
// //       {/* Map container */}
// //       <div
// //         id='map'
// //         style={{
// //           height: '100%',
// //           width: '100%',
// //           zIndex: 0, // Ensure the map is behind other elements
// //           //   overflow: 'hidden', // Ensure no overflow occurs
// //         }}
// //       />

// //       {/* Route Information Card */}
// //       {!loading && (
// //         <Card
// //           style={{
// //             position: 'absolute',
// //             top: '10px',
// //             left: '50%',
// //             transform: 'translateX(-50%)',
// //             backgroundColor: 'rgba(255, 255, 255, 0.8)',
// //             padding: '10px',
// //             borderRadius: '10px',
// //             boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
// //           }}
// //         >
// //           <Card.Body>
// //             <Card.Title className='text-center'>Ride Route</Card.Title>
// //             <Card.Text>
// //               <strong>From:</strong> {startLocation}
// //             </Card.Text>
// //             <Card.Text>
// //               <strong>To:</strong> {endLocation}
// //             </Card.Text>
// //           </Card.Body>
// //         </Card>
// //       )}

// //       {/* Bottom Container for Search Bar and Route Options */}
// //       <div
// //         style={{
// //           position: 'absolute',
// //           bottom: '20px', // Position at the bottom of the map
// //           left: '50%',
// //           transform: 'translateX(-50%)',
// //           background: 'white',
// //           padding: '20px',
// //           borderRadius: '10px',
// //           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
// //           width: '80%', // Adjust width as needed
// //         }}
// //       >
// //         {/* Search Bar */}
// //         <div style={{ marginBottom: '10px' }}>
// //           <FontAwesomeIcon icon={faSearch} />
// //           <input
// //             type='text'
// //             value={query}
// //             onChange={(e) => setQuery(e.target.value)}
// //             placeholder='Search location'
// //             style={{
// //               marginLeft: '10px',
// //               padding: '5px',
// //               width: '200px',
// //               borderRadius: '5px',
// //               zIndex: 1000,
// //             }}
// //           />
// //           <Button onClick={handleSearch} variant='outline-primary'>
// //             Search
// //           </Button>
// //         </div>

// //         {/* Route Options Form */}
// //         <Form>
// //           <Form.Check
// //             type='checkbox'
// //             label='Avoid Highways'
// //             name='avoidHighways'
// //             checked={routeOptions.avoidHighways}
// //             onChange={handleRouteOptionChange}
// //           />
// //           <Form.Check
// //             type='checkbox'
// //             label='Avoid Tolls'
// //             name='avoidTolls'
// //             checked={routeOptions.avoidTolls}
// //             onChange={handleRouteOptionChange}
// //           />
// //         </Form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RideMapView;
