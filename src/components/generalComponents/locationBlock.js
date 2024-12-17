import React, { useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const AutocompleteSearch = () => {
  const [query, setQuery] = useState(''); // User input
  const [suggestions, setSuggestions] = useState([]); // Autocomplete results
  const [selectedPlace, setSelectedPlace] = useState(null); // Chosen place details

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
    [] // Empty array ensures the function is debounced once
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
    setSelectedPlace(place);
    setQuery(place.display_name); // Set the selected address in input
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div style={{ width: '400px', margin: 'auto' }}>
      {/* Input field for autocomplete */}
      <input
        type='text'
        value={query}
        onChange={handleInputChange}
        placeholder='Search for a place...'
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
              {item.display_name} {/* Display address */}
            </li>
          ))}
        </ul>
      )}

      {/* Selected Place Details */}
      {selectedPlace && (
        <div style={{ marginTop: '20px' }}>
          <h3>Selected Place:</h3>
          <p>
            <strong>Address:</strong> {selectedPlace.display_name}
          </p>
          <p>
            <strong>Latitude:</strong> {selectedPlace.lat},{' '}
            <strong>Longitude:</strong> {selectedPlace.lon}
          </p>
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;
