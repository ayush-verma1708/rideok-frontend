import React, { useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const AutocompleteSearch = ({ onSelectLocation, fieldName, value }) => {
  const [query, setQuery] = useState(value || ''); // User input
  const [suggestions, setSuggestions] = useState([]); // Autocomplete results
  const [selectedLocation, setSelectedLocation] = useState(null); // Selected location for map

  // Fetch suggestions from Nominatim API
  const fetchSuggestions = useCallback(async (query) => {
    try {
      const response = await axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
          params: { q: query, format: 'json', addressdetails: 1, limit: 3 },
        }
      );
      setSuggestions(response.data); // Update suggestions state
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }, []);

  // Debounced function for input changes
  const debouncedFetchSuggestions = useCallback(
    debounce((query) => fetchSuggestions(query), 300),
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

      {/* Autocomplete Suggestions */}
      {suggestions.length > 0 && (
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

      {/* Show 'View on Map' button if a location is selected */}
      {selectedLocation && (
        <div style={{ marginTop: '10px' }}>
          <button
            onClick={handleViewOnMap}
            style={{
              padding: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            View on Map
          </button>
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;

// // AutocompleteSearch.js
// import React, { useState, useCallback } from 'react';
// import axios from 'axios';
// import debounce from 'lodash.debounce';

// const AutocompleteSearch = ({ onSelectLocation, fieldName, value }) => {
//   const [query, setQuery] = useState(value || ''); // User input
//   const [suggestions, setSuggestions] = useState([]); // Autocomplete results

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
//     onSelectLocation(place.display_name, fieldName); // Notify parent about the selected place
//     setSuggestions([]); // Clear suggestions
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
//     </div>
//   );
// };

// export default AutocompleteSearch;
