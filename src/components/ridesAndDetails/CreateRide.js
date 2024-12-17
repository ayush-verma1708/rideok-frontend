import React, { useState, useEffect, useCallback } from 'react';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash.debounce';
import { createRide } from '../../api/rideApi';
import { getLocationData } from '../../services/geoLocationApi'; // Use the getLocationData API function

const CreateRide = () => {
  const [rideData, setRideData] = useState({
    startLocation: '',
    endLocation: '',
    rideDate: '',
    availableSeats: 1,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [startLocationSuggestions, setStartLocationSuggestions] = useState([]);
  const [endLocationSuggestions, setEndLocationSuggestions] = useState([]);

  const handleChange = (e, { newValue }) => {
    setRideData({
      ...rideData,
      [e.target.name]: newValue,
    });
  };

  const fetchLocationData = useCallback(
    debounce(async (location, name) => {
      if (location.length >= 3) {
        // Start fetching after 3 characters
        try {
          const locations = await getLocationData(location); // Fetch data
          if (name === 'startLocation') {
            setStartLocationSuggestions(locations);
          } else {
            setEndLocationSuggestions(locations);
          }
        } catch (error) {
          console.error('Error fetching location data:', error);
          setErrorMessage(
            'Error fetching location data. Please try again later.'
          );
        }
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (rideData.startLocation) {
      fetchLocationData(rideData.startLocation, 'startLocation');
    }
  }, [rideData.startLocation, fetchLocationData]);

  useEffect(() => {
    if (rideData.endLocation) {
      fetchLocationData(rideData.endLocation, 'endLocation');
    }
  }, [rideData.endLocation, fetchLocationData]);

  const handleSelectLocation = (value, name) => {
    setRideData({
      ...rideData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      if (
        !rideData.startLocation ||
        !rideData.endLocation ||
        !rideData.rideDate ||
        !rideData.availableSeats
      ) {
        throw new Error('All fields are required');
      }

      const newRide = await createRide(rideData);
      setIsLoading(false);
      setSuccessMessage('Ride created successfully!');
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message || 'An unexpected error occurred');
    }
  };

  const renderSuggestion = (suggestion) => (
    <div>{suggestion.name || suggestion.address}</div> // Choose the appropriate field
  );
  const getSuggestions = (value, location) => {
    const suggestions =
      location === 'start' ? startLocationSuggestions : endLocationSuggestions;
    return suggestions && suggestions.length > 0
      ? suggestions.filter((suggestion) =>
          (suggestion.name || suggestion.address)
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      : [];
  };

  const inputProps = (name, value, onChange) => ({
    value,
    onChange: (e, { newValue }) => onChange(e, { newValue }),
    placeholder: `Enter ${name}`,
    name,
  });

  const getSuggestionValue = (suggestion) =>
    suggestion.name || suggestion.address;

  return (
    <div>
      <h3>Create a Ride</h3>
      {successMessage && <Alert variant='success'>{successMessage}</Alert>}
      {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='startLocation'>
          <Form.Label>Start Location</Form.Label>
          <Autosuggest
            suggestions={getSuggestions(rideData.startLocation, 'start')}
            onSuggestionsFetchRequested={({ value }) =>
              fetchLocationData(value, 'startLocation')
            }
            onSuggestionsClearRequested={() => setStartLocationSuggestions([])}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps(
              'startLocation',
              rideData.startLocation,
              handleChange
            )}
            onSuggestionSelected={(_, { suggestion }) =>
              handleSelectLocation(
                suggestion.name || suggestion.address,
                'startLocation'
              )
            }
            highlightFirstSuggestion={true}
          />
        </Form.Group>

        <Form.Group controlId='endLocation'>
          <Form.Label>End Location</Form.Label>
          <Autosuggest
            suggestions={getSuggestions(rideData.endLocation, 'end')}
            onSuggestionsFetchRequested={({ value }) =>
              fetchLocationData(value, 'endLocation')
            }
            onSuggestionsClearRequested={() => setEndLocationSuggestions([])}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps(
              'endLocation',
              rideData.endLocation,
              handleChange
            )}
            onSuggestionSelected={(_, { suggestion }) =>
              handleSelectLocation(
                suggestion.name || suggestion.address,
                'endLocation'
              )
            }
            highlightFirstSuggestion={true}
          />
        </Form.Group>

        <Form.Group controlId='rideDate'>
          <Form.Label>Ride Date</Form.Label>
          <Form.Control
            type='date'
            name='rideDate'
            value={rideData.rideDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId='availableSeats'>
          <Form.Label>Seats Available</Form.Label>
          <Form.Control
            type='number'
            name='availableSeats'
            value={rideData.availableSeats}
            onChange={handleChange}
            required
            min='1'
          />
        </Form.Group>

        <Button type='submit' variant='primary' disabled={isLoading}>
          {isLoading ? (
            <Spinner as='span' animation='border' size='sm' />
          ) : (
            'Create Ride'
          )}
        </Button>
      </Form>
    </div>
  );
};

export default CreateRide;
