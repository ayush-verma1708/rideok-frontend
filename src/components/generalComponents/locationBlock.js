import React, { useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const AutocompleteSearch = ({ onSelectLocation, fieldName, value }) => {
  const [query, setQuery] = useState(value || ''); // User input
  const [suggestions, setSuggestions] = useState([]); // Autocomplete results
  const [selectedLocation, setSelectedLocation] = useState(null); // Selected location for map
  const [loading, setLoading] = useState(false); // Loading state for suggestions
  const [suggestionsError, setSuggestionsError] = useState(null); // Error state for suggestion fetch
  const [locationError, setLocationError] = useState(null); // Error state for location fetch

  // Get current location using the Geolocation API
  const handleGetCurrentLocation = () => {
    setLoading(true); // Show loading spinner
    setLocationError(null); // Reset any previous errors

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Use the latitude and longitude to fetch the location name
          axios
            .get('https://nominatim.openstreetmap.org/reverse', {
              params: {
                lat: latitude,
                lon: longitude,
                format: 'json',
                addressdetails: 1,
              },
            })
            .then((response) => {
              const place = response.data;
              setQuery(place.display_name); // Set the location name in input field
              setSelectedLocation(place); // Set the selected location for map
              onSelectLocation(place.display_name, fieldName); // Notify parent about the selected place
              setLoading(false); // Hide loading spinner
            })
            .catch((error) => {
              console.error(
                'Error fetching location for current position:',
                error
              );
              setLocationError('Unable to fetch current location'); // Show error message
              setLoading(false); // Hide loading spinner
            });
        },
        (error) => {
          console.error('Error getting current location:', error);
          setLocationError('Permission denied or location unavailable'); // Show error message
          setLoading(false); // Hide loading spinner
        },
        {
          enableHighAccuracy: true, // Request higher accuracy
          timeout: 10000, // Timeout after 10 seconds if location is not available
          maximumAge: 0, // Ensure fresh location data (don't use cached data)
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.'); // Show error message
      setLoading(false); // Hide loading spinner
    }
  };

  // Fetch suggestions from Nominatim API
  const fetchSuggestions = useCallback(async (query) => {
    setLoading(true); // Set loading state to true when fetching suggestions
    setSuggestionsError(null); // Clear previous errors
    try {
      const response = await axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
          params: { q: query, format: 'json', addressdetails: 1, limit: 5 },
        }
      );
      setSuggestions(response.data); // Update suggestions state
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestionsError(
        'Failed to fetch suggestions. Please try again later.'
      );
    } finally {
      setLoading(false); // Set loading state to false after fetch
    }
  }, []);

  // Debounced function for input changes
  const debouncedFetchSuggestions = useCallback(
    debounce((query) => fetchSuggestions(query), 500), // Increased debounce delay to reduce API calls
    []
  );

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Directly update the input value
    if (value.length > 2) {
      debouncedFetchSuggestions(value); // Trigger API call with debounce
    } else {
      setSuggestions([]); // Clear suggestions if input is less than 3 characters
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (place) => {
    setQuery(place.display_name); // Set the selected address in input
    setSelectedLocation(place); // Store selected location for map
    onSelectLocation(place.display_name, fieldName); // Notify parent about the selected place
    setSuggestions([]); // Clear suggestions
  };

  // Open selected location on map (using OpenStreetMap link for simplicity)
  const handleViewOnMap = () => {
    if (selectedLocation) {
      const { lat, lon } = selectedLocation;
      const mapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}`;
      window.open(mapUrl, '_blank'); // Open map in new tab
    }
  };

  return (
    <div>
      <input
        type='text'
        value={query}
        onChange={handleInputChange}
        placeholder={`Enter ${fieldName}`}
        style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
      />

      {/* Loading indicator */}
      {loading && !suggestionsError && (
        <div style={{ marginTop: '10px', fontSize: '14px', color: 'gray' }}>
          Loading suggestions...
        </div>
      )}

      {/* Error message for suggestion fetch */}
      {suggestionsError && (
        <div style={{ marginTop: '10px', color: 'red', fontSize: '14px' }}>
          {suggestionsError}
        </div>
      )}

      {/* Autocomplete Suggestions */}
      {suggestions.length > 0 && !loading && (
        <ul style={{ listStyle: 'none', padding: 0, border: '1px solid #ccc' }}>
          {suggestions.map((item, index) => (
            <li
              key={index}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #ddd',
              }}
              onClick={() => handleSuggestionClick(item)}
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}

      {/* Buttons Container */}
      <div
        style={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        {/* 'View on Map' button */}
        {selectedLocation && (
          <button
            onClick={handleViewOnMap}
            style={{
              padding: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              flex: 1,
            }}
          >
            View on Map
          </button>
        )}

        {/* 'Pick Current Location' button */}
        <button
          onClick={() => handleGetCurrentLocation()}
          style={{
            padding: '10px',
            backgroundColor: loading ? '#B0BEC5' : '#2196F3',
            color: 'white',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s',
            fontWeight: 'bold',
            flex: 1,
          }}
          disabled={loading}
        >
          {loading ? 'Locating...' : 'Pick Current Location'}
        </button>
      </div>
    </div>
  );
};

export default AutocompleteSearch;

// import React, { useState, useCallback } from 'react';
// import axios from 'axios';
// import debounce from 'lodash.debounce';

// const AutocompleteSearch = ({ onSelectLocation, fieldName, value }) => {
//   const [query, setQuery] = useState(value || ''); // User input
//   const [suggestions, setSuggestions] = useState([]); // Autocomplete results
//   const [selectedLocation, setSelectedLocation] = useState(null); // Selected location for map
//   const [loading, setLoading] = useState(false); // Loading state for current location fetch

//   // Fetch suggestions from Nominatim API
//   const fetchSuggestions = useCallback(async (query) => {
//     try {
//       const response = await axios.get(
//         'https://nominatim.openstreetmap.org/search',
//         {
//           params: { q: query, format: 'json', addressdetails: 1, limit: 3 },
//         }
//       );
//       setSuggestions(response.data); // Update suggestions state
//     } catch (error) {
//       console.error('Error fetching suggestions:', error);
//     }
//   }, []);

//   // Debounced function for input changes
//   const debouncedFetchSuggestions = useCallback(
//     debounce((query) => fetchSuggestions(query), 300),
//     []
//   );

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value); // Directly update the input value
//     if (value.length > 2) {
//       debouncedFetchSuggestions(value); // Trigger API call with debounce
//     } else {
//       setSuggestions([]); // Clear suggestions if input is less than 3 characters
//     }
//   };

//   // Handle suggestion click
//   const handleSuggestionClick = (place) => {
//     setQuery(place.display_name); // Set the selected address in input
//     setSelectedLocation(place); // Store selected location for map
//     onSelectLocation(place.display_name, fieldName); // Notify parent about the selected place
//     setSuggestions([]); // Clear suggestions
//   };

//   // Open selected location on map (using OpenStreetMap link for simplicity)
//   const handleViewOnMap = () => {
//     if (selectedLocation) {
//       const { lat, lon } = selectedLocation;
//       const mapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}`;
//       window.open(mapUrl, '_blank'); // Open map in new tab
//     }
//   };

//   return (
//     <div>
//       <input
//         type='text'
//         value={query}
//         onChange={handleInputChange}
//         placeholder={`Enter ${fieldName}`}
//         style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
//       />

//       {/* Autocomplete Suggestions */}
//       {suggestions.length > 0 && (
//         <ul style={{ listStyle: 'none', padding: 0, border: '1px solid #ccc' }}>
//           {suggestions.map((item, index) => (
//             <li
//               key={index}
//               style={{
//                 padding: '10px',
//                 cursor: 'pointer',
//                 borderBottom: '1px solid #ddd',
//               }}
//               onClick={() => handleSuggestionClick(item)}
//             >
//               {item.display_name}
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Buttons Container */}
//       <div
//         style={{
//           marginTop: '10px',
//           display: 'flex',
//           justifyContent: 'space-between', // Ensure space between buttons
//           gap: '10px', // Add space between buttons
//         }}
//       >
//         {/* 'View on Map' button */}
//         {selectedLocation && (
//           <button
//             onClick={handleViewOnMap}
//             style={{
//               padding: '10px',
//               backgroundColor: '#4CAF50',
//               color: 'white',
//               border: 'none',
//               cursor: 'pointer',
//               flex: 1, // Allow button to grow and fill available space
//             }}
//           >
//             View on Map
//           </button>
//         )}

//         {/* 'Pick Current Location' button */}
//         <button
//           onClick={handleGetCurrentLocation}
//           style={{
//             padding: '10px',
//             backgroundColor: loading ? '#B0BEC5' : '#2196F3',
//             color: 'white',
//             border: 'none',
//             cursor: loading ? 'not-allowed' : 'pointer',
//             transition: 'background-color 0.3s',
//             fontWeight: 'bold',
//             flex: 1, // Allow button to grow and fill available space
//           }}
//           disabled={loading}
//         >
//           {loading ? 'Locating...' : 'Pick Current Location'}
//         </button>
//       </div>

//       {/* Error message */}
//       {locationError && (
//         <div style={{ marginTop: '10px', color: 'red', fontSize: '14px' }}>
//           {locationError}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AutocompleteSearch;
