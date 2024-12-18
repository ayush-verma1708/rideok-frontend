import React, { useState, useEffect } from 'react';
import { searchRides, getAllRides, bookRide } from '../../api/rideApi.js'; // Import API functions
import AutocompleteSearch from '../generalComponents/locationBlock.js';

const SearchRides = () => {
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [pickupLocation, setPickupLocation] = useState(''); // State for pickup location
  const [dropoffLocation, setDropoffLocation] = useState(''); // State for drop-off location

  // Search Inputs
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [rideDate, setRideDate] = useState('');

  // Filters and Sorting
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('default');

  // Modal for Ride Details
  const [selectedRide, setSelectedRide] = useState(null);

  // Fetch Rides
  useEffect(() => {
    const fetchRides = async () => {
      setLoading(true);
      try {
        const data = await getAllRides(); // Use API function to fetch all rides
        setRides(data);
        setFilteredRides(data);
      } catch (err) {
        setError('Failed to load rides. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  // Handle Filters
  useEffect(() => {
    let filtered = [...rides];

    // Filter by Price Range
    filtered = filtered.filter(
      (ride) => ride.price >= priceRange[0] && ride.price <= priceRange[1]
    );

    // Sort Results
    if (sortBy === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'earliest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFilteredRides(filtered);
  }, [rides, priceRange, sortBy]);

  // Handle location selection
  const handleLocationSelect = (location, fieldName) => {
    if (fieldName === 'Pickup Location') {
      setPickupLocation(location);
    } else if (fieldName === 'Drop-off Location') {
      setDropoffLocation(location);
    } else if (fieldName === 'Start Location') {
      setStartLocation(location);
    } else if (fieldName === 'End Location') {
      setEndLocation(location);
    }
  };

  // Handle Ride Search
  const handleSearch = async () => {
    // Prepare search criteria
    const searchCriteria = {};
    if (startLocation) searchCriteria.startLocation = startLocation;
    if (endLocation) searchCriteria.endLocation = endLocation;
    if (rideDate) searchCriteria.date = rideDate;

    // Check if at least one field is filled
    if (Object.keys(searchCriteria).length === 0) {
      setError('Please fill at least one search field.');
      return;
    }

    setLoading(true);
    try {
      const data = await searchRides(startLocation, endLocation); // Use API function to search rides
      setRides(data);
      setFilteredRides(data);
      setError(data.length ? '' : 'No rides found for your search.');
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Booking
  const handleBookRide = async (rideId) => {
    setLoading(true);
    try {
      await bookRide(rideId); // Use API function to book a ride
      setSuccess(true);
      setError('');
    } catch (err) {
      setError('Failed to book the ride. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container my-4'>
      <h2 className='text-center mb-4'>Search Rides</h2>
      {/* Search Form */}
      <div className='row g-3 mb-4'>
        <div className='col-md-4'>
          <AutocompleteSearch
            onSelectLocation={handleLocationSelect}
            fieldName='Start Location'
            value={startLocation}
          />
        </div>
        <div className='col-md-4'>
          <AutocompleteSearch
            onSelectLocation={handleLocationSelect}
            fieldName='End Location'
            value={endLocation}
          />
        </div>
        <div className='col-md-4'>
          <input
            type='date'
            className='form-control'
            value={rideDate}
            onChange={(e) => setRideDate(e.target.value)}
          />
        </div>
        <div className='col-12 text-center'>
          <button className='btn btn-primary w-50' onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className='row g-3 mb-4'>
        <div className='col-md-6'>
          <label className='form-label'>Price Range</label>
          <input
            type='range'
            className='form-range'
            min='0'
            max='1000'
            step='10'
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          />
          <p>₹0 - ₹{priceRange[1]}</p>
        </div>
        <div className='col-md-6'>
          <label className='form-label'>Sort By</label>
          <select
            className='form-select'
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value='default'>Default</option>
            <option value='price'>Lowest Price</option>
            <option value='earliest'>Earliest Ride</option>
          </select>
        </div>
      </div>

      {/* Ride Cards */}
      <div className='row g-3'>
        {loading ? (
          <div className='text-center'>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        ) : (
          filteredRides.map((ride) => (
            <div className='col-md-4' key={ride.id}>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>
                    {ride.startLocation} → {ride.endLocation}
                  </h5>
                  <p className='card-text'>Date: {ride.date}</p>
                  <p className='card-text'>Price: ₹{ride.price}</p>
                  <button
                    className='btn btn-outline-primary me-2'
                    onClick={() => setSelectedRide(ride)}
                  >
                    View Details
                  </button>
                  <button
                    className='btn btn-primary'
                    onClick={() => handleBookRide(ride.id)}
                  >
                    Book Ride
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Ride Details */}
      {selectedRide && (
        <div
          className='modal fade show d-block'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='rideDetailsModal'
          aria-hidden='true'
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Ride Details</h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={() => setSelectedRide(null)}
                ></button>
              </div>
              <div className='modal-body'>
                <p>From: {selectedRide.startLocation}</p>
                <p>To: {selectedRide.endLocation}</p>
                <p>Date: {selectedRide.date}</p>
                <p>Price: ₹{selectedRide.price}</p>
                <p>Seats Available: {selectedRide.seatsAvailable}</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => setSelectedRide(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {error && (
        <div className='alert alert-danger' role='alert'>
          {error}
        </div>
      )}
      {success && (
        <div className='alert alert-success' role='alert'>
          Ride booked successfully!
        </div>
      )}
    </div>
  );
};

export default SearchRides;

// import React, { useState, useEffect } from 'react';

// import AutocompleteSearch from '../generalComponents/locationBlock.js';

// const SearchRides = () => {
//   const [rides, setRides] = useState([]);
//   const [filteredRides, setFilteredRides] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [pickupLocation, setPickupLocation] = useState(''); // State for pickup location
//   const [dropoffLocation, setDropoffLocation] = useState(''); // State for drop-off location

//   // Search Inputs
//   const [startLocation, setStartLocation] = useState('');
//   const [endLocation, setEndLocation] = useState('');
//   const [rideDate, setRideDate] = useState('');

//   // Filters and Sorting
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [sortBy, setSortBy] = useState('default');

//   // Modal for Ride Details
//   const [selectedRide, setSelectedRide] = useState(null);

//   // Fetch Rides
//   useEffect(() => {
//     const fetchRides = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('/api/rides');
//         setRides(response.data);
//         setFilteredRides(response.data);
//       } catch (err) {
//         setError('Failed to load rides. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRides();
//   }, []);

//   // Handle Filters
//   useEffect(() => {
//     let filtered = [...rides];

//     // Filter by Price Range
//     filtered = filtered.filter(
//       (ride) => ride.price >= priceRange[0] && ride.price <= priceRange[1]
//     );

//     // Sort Results
//     if (sortBy === 'price') {
//       filtered.sort((a, b) => a.price - b.price);
//     } else if (sortBy === 'earliest') {
//       filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
//     }

//     setFilteredRides(filtered);
//   }, [rides, priceRange, sortBy]);

//   // Handle location selection
//   const handleLocationSelect = (location, fieldName) => {
//     if (fieldName === 'Pickup Location') {
//       setPickupLocation(location);
//     } else if (fieldName === 'Drop-off Location') {
//       setDropoffLocation(location);
//     } else if (fieldName === 'Start Location') {
//       setStartLocation(location);
//     } else if (fieldName === 'End Location') {
//       setEndLocation(location);
//     }
//   };

//   // Handle Ride Search
//   const handleSearch = async () => {
//     // Prepare search criteria
//     const searchCriteria = {};
//     if (startLocation) searchCriteria.startLocation = startLocation;
//     if (endLocation) searchCriteria.endLocation = endLocation;
//     if (rideDate) searchCriteria.date = rideDate;

//     // Check if at least one field is filled
//     if (Object.keys(searchCriteria).length === 0) {
//       setError('Please fill at least one search field.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post('/api/rides/search', searchCriteria);
//       setRides(response.data);
//       setFilteredRides(response.data);
//       setError(response.data.length ? '' : 'No rides found for your search.');
//     } catch (err) {
//       setError('Search failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleSearch = async () => {
//   //   if (!startLocation || !endLocation || !rideDate) {
//   //     setError('Please fill in all search fields.');
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   try {
//   //     const response = await axios.post('/api/rides/search', {
//   //       startLocation,
//   //       endLocation,
//   //       date: rideDate,
//   //     });
//   //     setRides(response.data);
//   //     setFilteredRides(response.data);
//   //     setError(response.data.length ? '' : 'No rides found for your search.');
//   //   } catch (err) {
//   //     setError('Search failed. Please try again.');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // Handle Booking
//   const handleBookRide = async (rideId) => {
//     setLoading(true);
//     try {
//       await axios.post(`/api/rides/${rideId}/book`);
//       setSuccess(true);
//       setError('');
//     } catch (err) {
//       setError('Failed to book the ride. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='container my-4'>
//       <h2 className='text-center mb-4'>Search Rides</h2>
//       {/* Search Form */}
//       <div className='row g-3 mb-4'>
//         <div className='col-md-4'>
//           <AutocompleteSearch
//             onSelectLocation={handleLocationSelect}
//             fieldName='Start Location'
//             value={startLocation}
//           />
//         </div>
//         <div className='col-md-4'>
//           <AutocompleteSearch
//             onSelectLocation={handleLocationSelect}
//             fieldName='End Location'
//             value={endLocation}
//           />
//         </div>
//         <div className='col-md-4'>
//           <input
//             type='date'
//             className='form-control'
//             value={rideDate}
//             onChange={(e) => setRideDate(e.target.value)}
//           />
//         </div>
//         <div className='col-12 text-center'>
//           <button className='btn btn-primary w-50' onClick={handleSearch}>
//             Search
//           </button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className='row g-3 mb-4'>
//         <div className='col-md-6'>
//           <label className='form-label'>Price Range</label>
//           <input
//             type='range'
//             className='form-range'
//             min='0'
//             max='1000'
//             step='10'
//             value={priceRange[1]}
//             onChange={(e) => setPriceRange([0, Number(e.target.value)])}
//           />
//           <p>₹0 - ₹{priceRange[1]}</p>
//         </div>
//         <div className='col-md-6'>
//           <label className='form-label'>Sort By</label>
//           <select
//             className='form-select'
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value='default'>Default</option>
//             <option value='price'>Lowest Price</option>
//             <option value='earliest'>Earliest Ride</option>
//           </select>
//         </div>
//       </div>

//       {/* Ride Cards */}
//       <div className='row g-3'>
//         {loading ? (
//           <div className='text-center'>
//             <div className='spinner-border text-primary' role='status'>
//               <span className='visually-hidden'>Loading...</span>
//             </div>
//           </div>
//         ) : (
//           filteredRides.map((ride) => (
//             <div className='col-md-4' key={ride.id}>
//               <div className='card'>
//                 <div className='card-body'>
//                   <h5 className='card-title'>
//                     {ride.startLocation} → {ride.endLocation}
//                   </h5>
//                   <p className='card-text'>Date: {ride.date}</p>
//                   <p className='card-text'>Price: ₹{ride.price}</p>
//                   <button
//                     className='btn btn-outline-primary me-2'
//                     onClick={() => setSelectedRide(ride)}
//                   >
//                     View Details
//                   </button>
//                   <button
//                     className='btn btn-primary'
//                     onClick={() => handleBookRide(ride.id)}
//                   >
//                     Book Ride
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Modal for Ride Details */}
//       {selectedRide && (
//         <div
//           className='modal fade show d-block'
//           tabIndex='-1'
//           role='dialog'
//           aria-labelledby='rideDetailsModal'
//           aria-hidden='true'
//         >
//           <div className='modal-dialog' role='document'>
//             <div className='modal-content'>
//               <div className='modal-header'>
//                 <h5 className='modal-title'>Ride Details</h5>
//                 <button
//                   type='button'
//                   className='btn-close'
//                   onClick={() => setSelectedRide(null)}
//                 ></button>
//               </div>
//               <div className='modal-body'>
//                 <p>From: {selectedRide.startLocation}</p>
//                 <p>To: {selectedRide.endLocation}</p>
//                 <p>Date: {selectedRide.date}</p>
//                 <p>Price: ₹{selectedRide.price}</p>
//                 <p>Seats Available: {selectedRide.seatsAvailable}</p>
//               </div>
//               <div className='modal-footer'>
//                 <button
//                   type='button'
//                   className='btn btn-secondary'
//                   onClick={() => setSelectedRide(null)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Notifications */}
//       {error && (
//         <div className='alert alert-danger' role='alert'>
//           {error}
//         </div>
//       )}
//       {success && (
//         <div className='alert alert-success' role='alert'>
//           Ride booked successfully!
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchRides;

// // import React, { useState, useEffect } from 'react';
// // import {
// //   Container,
// //   Grid,
// //   Card,
// //   CardContent,
// //   Typography,
// //   TextField,
// //   Button,
// //   Modal,
// //   Box,
// //   CircularProgress,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   Slider,
// //   Snackbar,
// //   Alert,
// // } from '@mui/material';
// // import axios from 'axios';

// // const SearchRides = () => {
// //   const [rides, setRides] = useState([]);
// //   const [filteredRides, setFilteredRides] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState(false);

// //   // Search Inputs
// //   const [startLocation, setStartLocation] = useState('');
// //   const [endLocation, setEndLocation] = useState('');
// //   const [rideDate, setRideDate] = useState('');

// //   // Filters and Sorting
// //   const [priceRange, setPriceRange] = useState([0, 1000]);
// //   const [sortBy, setSortBy] = useState('default');

// //   // Modal for Ride Details
// //   const [selectedRide, setSelectedRide] = useState(null);

// //   // Fetch Rides
// //   useEffect(() => {
// //     const fetchRides = async () => {
// //       setLoading(true);
// //       try {
// //         const response = await axios.get('/api/rides');
// //         setRides(response.data);
// //         setFilteredRides(response.data);
// //       } catch (err) {
// //         setError('Failed to load rides. Please try again.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchRides();
// //   }, []);

// //   // Handle Filters
// //   useEffect(() => {
// //     let filtered = [...rides];

// //     // Filter by Price Range
// //     filtered = filtered.filter(
// //       (ride) => ride.price >= priceRange[0] && ride.price <= priceRange[1]
// //     );

// //     // Sort Results
// //     if (sortBy === 'price') {
// //       filtered.sort((a, b) => a.price - b.price);
// //     } else if (sortBy === 'earliest') {
// //       filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
// //     }

// //     setFilteredRides(filtered);
// //   }, [rides, priceRange, sortBy]);

// //   // Handle Ride Search
// //   const handleSearch = async () => {
// //     if (!startLocation || !endLocation || !rideDate) {
// //       setError('Please fill in all search fields.');
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const response = await axios.post('/api/rides/search', {
// //         startLocation,
// //         endLocation,
// //         date: rideDate,
// //       });
// //       setRides(response.data);
// //       setFilteredRides(response.data);
// //       setError(response.data.length ? '' : 'No rides found for your search.');
// //     } catch (err) {
// //       setError('Search failed. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Handle Booking
// //   const handleBookRide = async (rideId) => {
// //     setLoading(true);
// //     try {
// //       await axios.post(`/api/rides/${rideId}/book`);
// //       setSuccess(true);
// //       setError('');
// //     } catch (err) {
// //       setError('Failed to book the ride. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Price Slider Marks
// //   const priceMarks = [
// //     { value: 0, label: '₹0' },
// //     { value: 500, label: '₹500' },
// //     { value: 1000, label: '₹1000+' },
// //   ];

// //   return (
// //     <Container>
// //       <Typography variant='h4' gutterBottom>
// //         Search Rides
// //       </Typography>
// //       <Grid container spacing={3}>
// //         <Grid item xs={12} sm={6}>
// //           <TextField
// //             fullWidth
// //             label='Start Location'
// //             value={startLocation}
// //             onChange={(e) => setStartLocation(e.target.value)}
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <TextField
// //             fullWidth
// //             label='End Location'
// //             value={endLocation}
// //             onChange={(e) => setEndLocation(e.target.value)}
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <TextField
// //             fullWidth
// //             type='date'
// //             label='Date'
// //             InputLabelProps={{ shrink: true }}
// //             value={rideDate}
// //             onChange={(e) => setRideDate(e.target.value)}
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <Button variant='contained' color='primary' onClick={handleSearch}>
// //             Search
// //           </Button>
// //         </Grid>
// //       </Grid>

// //       <Grid container spacing={2} sx={{ marginTop: 4 }}>
// //         <Grid item xs={12} sm={6}>
// //           <Typography gutterBottom>Price Range</Typography>
// //           <Slider
// //             value={priceRange}
// //             onChange={(e, newValue) => setPriceRange(newValue)}
// //             valueLabelDisplay='auto'
// //             marks={priceMarks}
// //             min={0}
// //             max={1000}
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <FormControl fullWidth>
// //             <InputLabel>Sort By</InputLabel>
// //             <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
// //               <MenuItem value='default'>Default</MenuItem>
// //               <MenuItem value='price'>Lowest Price</MenuItem>
// //               <MenuItem value='earliest'>Earliest Ride</MenuItem>
// //             </Select>
// //           </FormControl>
// //         </Grid>
// //       </Grid>

// //       {loading ? (
// //         <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
// //       ) : (
// //         <Grid container spacing={2} sx={{ marginTop: 4 }}>
// //           {filteredRides.map((ride) => (
// //             <Grid item xs={12} sm={6} md={4} key={ride.id}>
// //               <Card>
// //                 <CardContent>
// //                   <Typography variant='h6'>
// //                     {ride.startLocation} → {ride.endLocation}
// //                   </Typography>
// //                   <Typography>Date: {ride.date}</Typography>
// //                   <Typography>Price: ₹{ride.price}</Typography>
// //                   <Button
// //                     variant='outlined'
// //                     onClick={() => setSelectedRide(ride)}
// //                   >
// //                     View Details
// //                   </Button>
// //                   <Button
// //                     variant='contained'
// //                     color='primary'
// //                     onClick={() => handleBookRide(ride.id)}
// //                   >
// //                     Book Ride
// //                   </Button>
// //                 </CardContent>
// //               </Card>
// //             </Grid>
// //           ))}
// //         </Grid>
// //       )}

// //       {/* Ride Details Modal */}
// //       <Modal
// //         open={!!selectedRide}
// //         onClose={() => setSelectedRide(null)}
// //         aria-labelledby='ride-details'
// //       >
// //         <Box
// //           sx={{
// //             padding: 4,
// //             backgroundColor: 'white',
// //             margin: '10% auto',
// //             maxWidth: 600,
// //           }}
// //         >
// //           {selectedRide && (
// //             <>
// //               <Typography id='ride-details' variant='h5'>
// //                 Ride Details
// //               </Typography>
// //               <Typography>From: {selectedRide.startLocation}</Typography>
// //               <Typography>To: {selectedRide.endLocation}</Typography>
// //               <Typography>Date: {selectedRide.date}</Typography>
// //               <Typography>Price: ₹{selectedRide.price}</Typography>
// //               <Typography>
// //                 Seats Available: {selectedRide.seatsAvailable}
// //               </Typography>
// //               <Button onClick={() => setSelectedRide(null)}>Close</Button>
// //             </>
// //           )}
// //         </Box>
// //       </Modal>

// //       <Snackbar
// //         open={!!error}
// //         autoHideDuration={6000}
// //         onClose={() => setError('')}
// //       >
// //         <Alert severity='error'>{error}</Alert>
// //       </Snackbar>
// //       <Snackbar
// //         open={success}
// //         autoHideDuration={6000}
// //         onClose={() => setSuccess(false)}
// //       >
// //         <Alert severity='success'>Ride booked successfully!</Alert>
// //       </Snackbar>
// //     </Container>
// //   );
// // };

// // export default SearchRides;

// // // import React, { useState, useEffect } from 'react';
// // // import { getAllRides, searchRides, bookRide } from '../../api/rideApi';
// // // import {
// // //   Button,
// // //   Form,
// // //   Row,
// // //   Col,
// // //   Card,
// // //   Alert,
// // //   Spinner,
// // //   Modal,
// // // } from 'react-bootstrap';

// // // const SearchRides = () => {
// // //   const [searchData, setSearchData] = useState({
// // //     startLocation: '',
// // //     endLocation: '',
// // //     rideDate: '',
// // //   });
// // //   const [rides, setRides] = useState([]);
// // //   const [filteredRides, setFilteredRides] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');
// // //   const [successMessage, setSuccessMessage] = useState('');
// // //   const [selectedRide, setSelectedRide] = useState(null);
// // //   const [showModal, setShowModal] = useState(false);

// // //   useEffect(() => {
// // //     const fetchAllRides = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const allRides = await getAllRides();
// // //         setRides(allRides);
// // //       } catch (error) {
// // //         setError('Error fetching rides. Please try again later.');
// // //         console.error(error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchAllRides();
// // //   }, []);

// // //   const handleChange = (e) => {
// // //     setSearchData({ ...searchData, [e.target.name]: e.target.value });
// // //   };

// // //   const handleSearch = async (e) => {
// // //     e.preventDefault();
// // //     setError('');
// // //     setLoading(true);

// // //     try {
// // //       const results = await searchRides(
// // //         searchData.startLocation,
// // //         searchData.endLocation
// // //       );

// // //       const filtered = results.filter((ride) =>
// // //         searchData.rideDate
// // //           ? new Date(ride.rideDate).toDateString() ===
// // //             new Date(searchData.rideDate).toDateString()
// // //           : true
// // //       );

// // //       setFilteredRides(filtered);
// // //       if (filtered.length === 0) {
// // //         setError('No rides found for the specified search criteria.');
// // //       }
// // //     } catch (error) {
// // //       setError('Error searching for rides. Please try again.');
// // //       console.error(error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleBookRide = async (rideId) => {
// // //     try {
// // //       setLoading(true);
// // //       await bookRide(rideId);
// // //       setSuccessMessage('Ride booked successfully!');
// // //       setShowModal(false);
// // //     } catch (error) {
// // //       setError('Failed to book the ride. Please try again.');
// // //       console.error(error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const openRideDetails = (ride) => {
// // //     setSelectedRide(ride);
// // //     setShowModal(true);
// // //   };

// // //   const closeRideDetails = () => {
// // //     setShowModal(false);
// // //     setSelectedRide(null);
// // //   };

// // //   return (
// // //     <div className='search-rides-container'>
// // //       <h3 className='mb-4'>Search for Rides</h3>
// // //       {error && <Alert variant='danger'>{error}</Alert>}
// // //       {successMessage && <Alert variant='success'>{successMessage}</Alert>}

// // //       <Form onSubmit={handleSearch}>
// // //         <Row className='mb-3'>
// // //           <Col md={4}>
// // //             <Form.Group controlId='startLocation'>
// // //               <Form.Label>Start Location</Form.Label>
// // //               <Form.Control
// // //                 type='text'
// // //                 name='startLocation'
// // //                 value={searchData.startLocation}
// // //                 onChange={handleChange}
// // //                 placeholder='Enter starting location'
// // //                 required
// // //               />
// // //             </Form.Group>
// // //           </Col>

// // //           <Col md={4}>
// // //             <Form.Group controlId='endLocation'>
// // //               <Form.Label>End Location</Form.Label>
// // //               <Form.Control
// // //                 type='text'
// // //                 name='endLocation'
// // //                 value={searchData.endLocation}
// // //                 onChange={handleChange}
// // //                 placeholder='Enter destination'
// // //                 required
// // //               />
// // //             </Form.Group>
// // //           </Col>

// // //           <Col md={3}>
// // //             <Form.Group controlId='rideDate'>
// // //               <Form.Label>Date</Form.Label>
// // //               <Form.Control
// // //                 type='date'
// // //                 name='rideDate'
// // //                 value={searchData.rideDate}
// // //                 onChange={handleChange}
// // //               />
// // //             </Form.Group>
// // //           </Col>

// // //           <Col md={1} className='d-flex align-items-end'>
// // //             <Button type='submit' variant='primary'>
// // //               Search
// // //             </Button>
// // //           </Col>
// // //         </Row>
// // //       </Form>

// // //       {loading && <Spinner animation='border' className='mt-3' />}

// // //       <div className='available-rides'>
// // //         <h4>Available Rides</h4>
// // //         {filteredRides.length > 0 ? (
// // //           <Row>
// // //             {filteredRides.map((ride) => (
// // //               <Col key={ride._id} md={4} className='mb-3'>
// // //                 <Card>
// // //                   <Card.Body>
// // //                     <Card.Title>
// // //                       {ride.startLocation} to {ride.endLocation}
// // //                     </Card.Title>
// // //                     <Card.Text>
// // //                       <strong>Date:</strong>{' '}
// // //                       {new Date(ride.rideDate).toDateString()}
// // //                       <br />
// // //                       <strong>Time:</strong> {ride.rideTime}
// // //                       <br />
// // //                       <strong>Seats:</strong> {ride.availableSeats}
// // //                       <br />
// // //                       <strong>Price:</strong> ₹{ride.price}
// // //                     </Card.Text>
// // //                     <Button
// // //                       variant='info'
// // //                       onClick={() => openRideDetails(ride)}
// // //                       className='me-2'
// // //                     >
// // //                       View Details
// // //                     </Button>
// // //                     <Button
// // //                       variant='success'
// // //                       onClick={() => handleBookRide(ride._id)}
// // //                     >
// // //                       Book Ride
// // //                     </Button>
// // //                   </Card.Body>
// // //                 </Card>
// // //               </Col>
// // //             ))}
// // //           </Row>
// // //         ) : (
// // //           <p>No rides available. Try a different search or create a ride.</p>
// // //         )}
// // //       </div>

// // //       {/* Ride Details Modal */}
// // //       {selectedRide && (
// // //         <Modal show={showModal} onHide={closeRideDetails}>
// // //           <Modal.Header closeButton>
// // //             <Modal.Title>Ride Details</Modal.Title>
// // //           </Modal.Header>
// // //           <Modal.Body>
// // //             <p>
// // //               <strong>Start Location:</strong> {selectedRide.startLocation}
// // //             </p>
// // //             <p>
// // //               <strong>End Location:</strong> {selectedRide.endLocation}
// // //             </p>
// // //             <p>
// // //               <strong>Date:</strong>{' '}
// // //               {new Date(selectedRide.rideDate).toDateString()}
// // //             </p>
// // //             <p>
// // //               <strong>Time:</strong> {selectedRide.rideTime}
// // //             </p>
// // //             <p>
// // //               <strong>Seats Available:</strong> {selectedRide.availableSeats}
// // //             </p>
// // //             <p>
// // //               <strong>Price:</strong> ₹{selectedRide.price}
// // //             </p>
// // //           </Modal.Body>
// // //           <Modal.Footer>
// // //             <Button variant='secondary' onClick={closeRideDetails}>
// // //               Close
// // //             </Button>
// // //             <Button
// // //               variant='success'
// // //               onClick={() => handleBookRide(selectedRide._id)}
// // //             >
// // //               Book Ride
// // //             </Button>
// // //           </Modal.Footer>
// // //         </Modal>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default SearchRides;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { getAllRides, bookRide, searchRides } from '../../api/rideApi';
// // // // import { Button, Form, Row, Col, Card } from 'react-bootstrap';

// // // // const SearchRides = () => {
// // // //   const [searchData, setSearchData] = useState({
// // // //     startLocation: '',
// // // //     endLocation: '',
// // // //   });
// // // //   const [rides, setRides] = useState([]);
// // // //   const [loading, setLoading] = useState(false);

// // // //   // Handle input change for search
// // // //   const handleChange = (e) => {
// // // //     setSearchData({
// // // //       ...searchData,
// // // //       [e.target.name]: e.target.value,
// // // //     });
// // // //   };

// // // //   // Handle search submit
// // // //   const handleSearch = async (e) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);
// // // //     try {
// // // //       let foundRides = await searchRides(
// // // //         searchData.startLocation,
// // // //         searchData.endLocation
// // // //       );
// // // //       setRides(foundRides);
// // // //     } catch (error) {
// // // //       console.error('Error searching for rides:', error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className='search-rides-container'>
// // // //       <h3>Search for Rides</h3>

// // // //       {/* Search Form */}
// // // //       <Form onSubmit={handleSearch}>
// // // //         <Row>
// // // //           <Col md={5}>
// // // //             <Form.Group controlId='startLocation'>
// // // //               <Form.Label>Start Location</Form.Label>
// // // //               <Form.Control
// // // //                 type='text'
// // // //                 name='startLocation'
// // // //                 value={searchData.startLocation}
// // // //                 onChange={handleChange}
// // // //                 placeholder='Enter starting location'
// // // //               />
// // // //             </Form.Group>
// // // //           </Col>

// // // //           <Col md={5}>
// // // //             <Form.Group controlId='endLocation'>
// // // //               <Form.Label>End Location</Form.Label>
// // // //               <Form.Control
// // // //                 type='text'
// // // //                 name='endLocation'
// // // //                 value={searchData.endLocation}
// // // //                 onChange={handleChange}
// // // //                 placeholder='Enter destination location'
// // // //               />
// // // //             </Form.Group>
// // // //           </Col>

// // // //           <Col md={2}>
// // // //             <Button type='submit' variant='primary' className='mt-4'>
// // // //               Search Rides
// // // //             </Button>
// // // //           </Col>
// // // //         </Row>
// // // //       </Form>

// // // //       {/* Loading Indicator */}
// // // //       {loading && <p>Loading available rides...</p>}

// // // //       {/* Display Available Rides */}
// // // //       <div className='available-rides'>
// // // //         <h4>Available Rides</h4>
// // // //         {rides.length > 0 ? (
// // // //           <Row>
// // // //             {rides.map((ride) => (
// // // //               <Col key={ride._id} md={10}>
// // // //                 <Card className='ride-card'>
// // // //                   <Card.Body>
// // // //                     <Card.Title>
// // // //                       {ride.startLocation} to {ride.endLocation}
// // // //                     </Card.Title>
// // // //                     <Card.Text>
// // // //                       <strong>Date:</strong>{' '}
// // // //                       {new Date(ride.rideDate).toLocaleDateString()}
// // // //                       <br />
// // // //                       <strong>Time:</strong>{' '}
// // // //                       {new Date(ride.rideTime).toLocaleTimeString()}
// // // //                       <br />
// // // //                       <strong>Available Seats:</strong> {ride.availableSeats}
// // // //                       <br />
// // // //                       <strong>Price:</strong> ₹{ride.price}
// // // //                     </Card.Text>
// // // //                     <Button
// // // //                       onClick={() => bookRide(ride._id)}
// // // //                       variant='success'
// // // //                       className='mt-2'
// // // //                     >
// // // //                       Book Ride
// // // //                     </Button>
// // // //                   </Card.Body>
// // // //                 </Card>
// // // //               </Col>
// // // //             ))}
// // // //           </Row>
// // // //         ) : (
// // // //           <p>No rides found that match your search.</p>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SearchRides;

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { getAllRides, bookRide, searchRides } from '../../api/rideApi';
// // // // // import { Button, Form } from 'react-bootstrap';

// // // // // const SearchRides = () => {
// // // // //   const [searchData, setSearchData] = useState({
// // // // //     startLocation: '',
// // // // //     endLocation: '',
// // // // //   });
// // // // //   const [rides, setRides] = useState([]);
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   const handleChange = (e) => {
// // // // //     setSearchData({
// // // // //       ...searchData,
// // // // //       [e.target.name]: e.target.value,
// // // // //     });
// // // // //   };

// // // // //   const handleSearch = async (e) => {
// // // // //     e.preventDefault();
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       let foundRides;

// // // // //       foundRides = await searchRides(
// // // // //         searchData.startLocation,
// // // // //         searchData.endLocation
// // // // //       );
// // // // //       setRides(foundRides);
// // // // //     } catch (error) {
// // // // //       console.error('Error searching for rides:', error);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <h3>Search for Rides</h3>
// // // // //       <Form onSubmit={handleSearch}>
// // // // //         <Form.Group controlId='startLocation'>
// // // // //           <Form.Label>Start Location</Form.Label>
// // // // //           <Form.Control
// // // // //             type='text'
// // // // //             name='startLocation'
// // // // //             value={searchData.startLocation}
// // // // //             onChange={handleChange}
// // // // //             placeholder='Enter starting location'
// // // // //           />
// // // // //         </Form.Group>

// // // // //         <Form.Group controlId='endLocation'>
// // // // //           <Form.Label>End Location</Form.Label>
// // // // //           <Form.Control
// // // // //             type='text'
// // // // //             name='endLocation'
// // // // //             value={searchData.endLocation}
// // // // //             onChange={handleChange}
// // // // //             placeholder='Enter destination location'
// // // // //           />
// // // // //         </Form.Group>

// // // // //         <Button type='submit' variant='primary'>
// // // // //           Search Rides
// // // // //         </Button>
// // // // //       </Form>

// // // // //       {loading && <p>Loading...</p>}

// // // // //       <div>
// // // // //         <h4>Available Rides</h4>
// // // // //         {rides.length > 0 ? (
// // // // //           <ul>
// // // // //             {rides.map((ride) => (
// // // // //               <li key={ride._id}>
// // // // //                 {ride.startLocation} to {ride.endLocation} on {ride.rideDate}
// // // // //                 <Button
// // // // //                   onClick={() => bookRide(ride._id)}
// // // // //                   variant='success'
// // // // //                   className='ml-2'
// // // // //                 >
// // // // //                   Book
// // // // //                 </Button>
// // // // //               </li>
// // // // //             ))}
// // // // //           </ul>
// // // // //         ) : (
// // // // //           <p>No rides found</p>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SearchRides;
