import React, { useState, useEffect } from 'react';
import { searchRides, getAllRides, bookRide } from '../../api/rideApi.js'; // Import API functions
import AutocompleteSearch from '../generalComponents/locationBlock.js';
import RideTile from '../common/RideTile.js'; // Import the reusable RideTile component
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const SearchRides = ({ user }) => {
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [showScheduleButton, setShowScheduleButton] = useState(false); // State to control button visibility
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch Rides
  useEffect(() => {
    fetchRides();
  }, []);

  const handleInputChange = (field, value) => {
    if (field === 'startLocation') {
      setStartLocation(value);
    } else if (field === 'endLocation') {
      setEndLocation(value);
    }

    if (!value) {
      fetchRides();
    }
  };

  const fetchRides = async () => {
    setLoading(true);
    try {
      const data = await getAllRides();
      setRides(data);
      setFilteredRides(data);
    } catch (err) {
      setError('Failed to load rides. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const searchCriteria = {};
    if (startLocation) searchCriteria.startLocation = startLocation;
    if (endLocation) searchCriteria.endLocation = endLocation;

    setLoading(true);
    try {
      let data;
      if (Object.keys(searchCriteria).length === 0) {
        data = await getAllRides();
      } else {
        data = await searchRides(startLocation, endLocation);
      }
      setRides(data);
      setFilteredRides(data);

      if (data.length === 0) {
        setError('No rides found for your search.');
        setShowScheduleButton(true); // Show the "schedule ride" button if no rides are found
      } else {
        setError('');
        setShowScheduleButton(false); // Hide the button if there are rides found
      }
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleRideClick = () => {
    navigate('/create-ride'); // Navigate to the create-ride page
  };

  return (
    <div className='container my-4'>
      <h2 className='text-center mb-4'>Search Rides</h2>
      <div className='row g-3 mb-4'>
        <div className='col-md-4'>
          <AutocompleteSearch
            onSelectLocation={(location) =>
              handleInputChange('startLocation', location)
            }
            fieldName='Start Location'
            value={startLocation}
          />
        </div>
        <div className='col-md-4'>
          <AutocompleteSearch
            onSelectLocation={(location) =>
              handleInputChange('endLocation', location)
            }
            fieldName='End Location'
            value={endLocation}
          />
        </div>

        <div className='col-12 text-center'>
          <button className='btn btn-primary w-50' onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

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
              <RideTile ride={ride} currentUser={user} />
            </div>
          ))
        )}
      </div>

      {error && (
        <div className='alert alert-danger' role='alert'>
          {error}
        </div>
      )}

      {showScheduleButton && (
        <div className='text-center'>
          <button className='btn btn-success' onClick={handleScheduleRideClick}>
            Would you like to schedule a ride?
          </button>
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
// import { searchRides, getAllRides, bookRide } from '../../api/rideApi.js'; // Import API functions
// import AutocompleteSearch from '../generalComponents/locationBlock.js';
// import RideTile from '../common/RideTile.js'; // Import the reusable RideTile component

// const SearchRides = ({ user }) => {
//   const [rides, setRides] = useState([]);
//   const [filteredRides, setFilteredRides] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [startLocation, setStartLocation] = useState('');
//   const [endLocation, setEndLocation] = useState('');

//   // Fetch Rides
//   useEffect(() => {
//     fetchRides();
//   }, []);

//   const handleInputChange = (field, value) => {
//     if (field === 'startLocation') {
//       setStartLocation(value);
//     } else if (field === 'endLocation') {
//       setEndLocation(value);
//     }

//     if (!value) {
//       fetchRides();
//     }
//   };

//   const fetchRides = async () => {
//     setLoading(true);
//     try {
//       const data = await getAllRides();
//       setRides(data);
//       setFilteredRides(data);
//     } catch (err) {
//       setError('Failed to load rides. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     const searchCriteria = {};
//     if (startLocation) searchCriteria.startLocation = startLocation;
//     if (endLocation) searchCriteria.endLocation = endLocation;

//     setLoading(true);
//     try {
//       let data;
//       if (Object.keys(searchCriteria).length === 0) {
//         data = await getAllRides();
//       } else {
//         data = await searchRides(startLocation, endLocation);
//       }
//       setRides(data);
//       setFilteredRides(data);
//       setError(data.length ? '' : 'No rides found for your search.');
//     } catch (err) {
//       setError('Search failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='container my-4'>
//       <h2 className='text-center mb-4'>Search Rides</h2>
//       <div className='row g-3 mb-4'>
//         <div className='col-md-4'>
//           <AutocompleteSearch
//             onSelectLocation={(location) =>
//               handleInputChange('startLocation', location)
//             }
//             fieldName='Start Location'
//             value={startLocation}
//           />
//         </div>
//         <div className='col-md-4'>
//           <AutocompleteSearch
//             onSelectLocation={(location) =>
//               handleInputChange('endLocation', location)
//             }
//             fieldName='End Location'
//             value={endLocation}
//           />
//         </div>

//         <div className='col-12 text-center'>
//           <button className='btn btn-primary w-50' onClick={handleSearch}>
//             Search
//           </button>
//         </div>
//       </div>

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
//               <RideTile ride={ride} currentUser={user} />
//             </div>
//           ))
//         )}
//       </div>

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
// // import { searchRides, getAllRides, bookRide } from '../../api/rideApi.js'; // Import API functions
// // import AutocompleteSearch from '../generalComponents/locationBlock.js';
// // import 'rc-slider/assets/index.css';
// // import Slider from 'rc-slider';

// // const SearchRides = () => {
// //   const [rides, setRides] = useState([]);
// //   const [filteredRides, setFilteredRides] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState(false);
// //   const [pickupLocation, setPickupLocation] = useState(''); // State for pickup location
// //   const [dropoffLocation, setDropoffLocation] = useState(''); // State for drop-off location

// //   // Search Inputs
// //   const [startLocation, setStartLocation] = useState('');
// //   const [endLocation, setEndLocation] = useState('');
// //   // Remove date and time range states
// //   // const [rideDate, setRideDate] = useState('');
// //   // const [timeRange, setTimeRange] = useState([0, 24]);

// //   // Modal for Ride Details
// //   const [selectedRide, setSelectedRide] = useState(null);

// //   // Fetch Rides
// //   useEffect(() => {
// //     fetchRides();
// //   }, []);

// //   // Handle input changes for filters
// //   const handleInputChange = (field, value) => {
// //     if (field === 'startLocation') {
// //       setStartLocation(value);
// //     } else if (field === 'endLocation') {
// //       setEndLocation(value);
// //     }

// //     // If any field is cleared, fetch all rides again
// //     if (!value) {
// //       fetchRides();
// //     }
// //   };

// //   // Fetch Rides function
// //   const fetchRides = async () => {
// //     setLoading(true);
// //     try {
// //       const data = await getAllRides(); // Use API function to fetch all rides
// //       setRides(data);
// //       setFilteredRides(data);
// //     } catch (err) {
// //       setError('Failed to load rides. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Handle Ride Search
// //   const handleSearch = async () => {
// //     // Prepare search criteria
// //     const searchCriteria = {};
// //     if (startLocation) searchCriteria.startLocation = startLocation;
// //     if (endLocation) searchCriteria.endLocation = endLocation;

// //     setLoading(true);
// //     try {
// //       let data;
// //       if (Object.keys(searchCriteria).length === 0) {
// //         // If no search criteria, fetch all rides
// //         data = await getAllRides();
// //       } else {
// //         // Use API function to search rides
// //         data = await searchRides(startLocation, endLocation);
// //       }
// //       setRides(data);
// //       setFilteredRides(data);
// //       setError(data.length ? '' : 'No rides found for your search.');
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
// //       await bookRide(rideId); // Use API function to book a ride
// //       setSuccess(true);
// //       setError('');
// //     } catch (err) {
// //       setError('Failed to book the ride. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className='container my-4'>
// //       <h2 className='text-center mb-4'>Search Rides</h2>
// //       {/* Search Form */}
// //       <div className='row g-3 mb-4'>
// //         <div className='col-md-4'>
// //           <AutocompleteSearch
// //             onSelectLocation={(location) =>
// //               handleInputChange('startLocation', location)
// //             }
// //             fieldName='Start Location'
// //             value={startLocation}
// //           />
// //         </div>
// //         <div className='col-md-4'>
// //           <AutocompleteSearch
// //             onSelectLocation={(location) =>
// //               handleInputChange('endLocation', location)
// //             }
// //             fieldName='End Location'
// //             value={endLocation}
// //           />
// //         </div>

// //         <div className='col-12 text-center'>
// //           <button className='btn btn-primary w-50' onClick={handleSearch}>
// //             Search
// //           </button>
// //         </div>
// //       </div>

// //       {/* Ride Cards */}
// //       <div className='row g-3'>
// //         {loading ? (
// //           <div className='text-center'>
// //             <div className='spinner-border text-primary' role='status'>
// //               <span className='visually-hidden'>Loading...</span>
// //             </div>
// //           </div>
// //         ) : (
// //           filteredRides.map((ride) => (
// //             <div className='col-md-4' key={ride.id}>
// //               <div className='card'>
// //                 <div className='card-body'>
// //                   <h5 className='card-title'>
// //                     {ride.startLocation} → {ride.endLocation}
// //                   </h5>
// //                   <p className='card-text'>
// //                     Date:{' '}
// //                     {new Date(ride.rideDate).toLocaleDateString('en-IN', {
// //                       day: '2-digit',
// //                       month: '2-digit',
// //                       year: 'numeric',
// //                     })}
// //                   </p>

// //                   <p className='card-text'>
// //                     Time:{' '}
// //                     {new Date(ride.rideTime).toLocaleTimeString([], {
// //                       hour: '2-digit',
// //                       minute: '2-digit',
// //                     })}
// //                   </p>

// //                   <p className='card-text'>Price: ₹{ride.price}</p>
// //                   <button
// //                     className='btn btn-outline-primary me-2'
// //                     onClick={() => setSelectedRide(ride)}
// //                   >
// //                     View Details
// //                   </button>
// //                   <button
// //                     className='btn btn-primary'
// //                     onClick={() => handleBookRide(ride.id)}
// //                   >
// //                     Book Ride
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>

// //       {/* Modal for Ride Details */}
// //       {selectedRide && (
// //         <div
// //           className='modal fade show d-block'
// //           tabIndex='-1'
// //           role='dialog'
// //           aria-labelledby='rideDetailsModal'
// //           aria-hidden='true'
// //         >
// //           <div className='modal-dialog' role='document'>
// //             <div className='modal-content'>
// //               <div className='modal-header'>
// //                 <h5 className='modal-title'>Ride Details</h5>
// //                 <button
// //                   type='button'
// //                   className='btn-close'
// //                   onClick={() => setSelectedRide(null)}
// //                 ></button>
// //               </div>
// //               <div className='modal-body'>
// //                 <p>From: {selectedRide.startLocation}</p>
// //                 <p>To: {selectedRide.endLocation}</p>
// //                 <p>Date: {selectedRide.rideDate}</p>
// //                 <p>Time: {selectedRide.rideTime}</p>
// //                 <p>Price: ₹{selectedRide.price}</p>
// //                 <p>Seats Available: {selectedRide.availableSeats}</p>
// //               </div>
// //               <div className='modal-footer'>
// //                 <button
// //                   type='button'
// //                   className='btn btn-secondary'
// //                   onClick={() => setSelectedRide(null)}
// //                 >
// //                   Close
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Notifications */}
// //       {error && (
// //         <div className='alert alert-danger' role='alert'>
// //           {error}
// //         </div>
// //       )}
// //       {success && (
// //         <div class='alert alert-success' role='alert'>
// //           Ride booked successfully!
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SearchRides;
