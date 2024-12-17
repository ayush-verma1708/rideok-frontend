import React, { useState, useEffect } from 'react';
import { getAllRides, bookRide, searchRides } from '../../api/rideApi';
import { Button, Form } from 'react-bootstrap';

const SearchRides = () => {
  const [searchData, setSearchData] = useState({
    startLocation: '',
    endLocation: '',
  });
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // If no startLocation or endLocation is provided, fetch all rides
      let foundRides;
      // if (!searchData.startLocation && !searchData.endLocation) {
      //   foundRides = await getAllRides();
      // } else {
      //   );
      // }
      foundRides = await searchRides(
        searchData.startLocation,
        searchData.endLocation
      );
      setRides(foundRides);
    } catch (error) {
      console.error('Error searching for rides:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Search for Rides</h3>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId='startLocation'>
          <Form.Label>Start Location</Form.Label>
          <Form.Control
            type='text'
            name='startLocation'
            value={searchData.startLocation}
            onChange={handleChange}
            placeholder='Enter starting location'
          />
        </Form.Group>

        <Form.Group controlId='endLocation'>
          <Form.Label>End Location</Form.Label>
          <Form.Control
            type='text'
            name='endLocation'
            value={searchData.endLocation}
            onChange={handleChange}
            placeholder='Enter destination location'
          />
        </Form.Group>

        <Button type='submit' variant='primary'>
          Search Rides
        </Button>
      </Form>

      {loading && <p>Loading...</p>}

      <div>
        <h4>Available Rides</h4>
        {rides.length > 0 ? (
          <ul>
            {rides.map((ride) => (
              <li key={ride._id}>
                {ride.startLocation} to {ride.endLocation} on {ride.rideDate}
                <Button
                  onClick={() => bookRide(ride._id)}
                  variant='success'
                  className='ml-2'
                >
                  Book
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No rides found</p>
        )}
      </div>
    </div>
  );
};

export default SearchRides;

// import React, { useEffect, useState } from 'react';
// import { getAllRides, bookRide, searchRides } from '../../api/rideApi';
// import { Button, Form } from 'react-bootstrap';

// const SearchRides = () => {
//   const [searchData, setSearchData] = useState({
//     startLocation: '',
//     endLocation: '',
//   });
//   const [rides, setRides] = useState([]);

//   const handleChange = (e) => {
//     setSearchData({
//       ...searchData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     try {
//       const foundRides = await searchRides(
//         searchData.startLocation,
//         searchData.endLocation
//       );
//       setRides(foundRides);
//     } catch (error) {
//       console.error('Error searching for rides:', error);
//     }
//   };

//   return (
//     <div>
//       <h3>Search for Rides</h3>
//       <Form onSubmit={handleSearch}>
//         <Form.Group controlId='startLocation'>
//           <Form.Label>Start Location</Form.Label>
//           <Form.Control
//             type='text'
//             name='startLocation'
//             value={searchData.startLocation}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId='endLocation'>
//           <Form.Label>End Location</Form.Label>
//           <Form.Control
//             type='text'
//             name='endLocation'
//             value={searchData.endLocation}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Button type='submit' variant='primary'>
//           Search Rides
//         </Button>
//       </Form>

//       <div>
//         <h4>Available Rides</h4>
//         {rides.length > 0 ? (
//           <ul>
//             {rides.map((ride) => (
//               <li key={ride._id}>
//                 {ride.startLocation} to {ride.endLocation} on {ride.rideDate}
//                 <Button onClick={() => bookRide(ride._id)}>Book</Button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No rides found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchRides;
