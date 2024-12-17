import React, { useState, useEffect } from 'react';
import { getAllRides, bookRide, searchRides } from '../../api/rideApi';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';

const SearchRides = () => {
  const [searchData, setSearchData] = useState({
    startLocation: '',
    endLocation: '',
  });
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle input change for search
  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle search submit
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let foundRides = await searchRides(
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
    <div className='search-rides-container'>
      <h3>Search for Rides</h3>

      {/* Search Form */}
      <Form onSubmit={handleSearch}>
        <Row>
          <Col md={5}>
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
          </Col>

          <Col md={5}>
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
          </Col>

          <Col md={2}>
            <Button type='submit' variant='primary' className='mt-4'>
              Search Rides
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Loading Indicator */}
      {loading && <p>Loading available rides...</p>}

      {/* Display Available Rides */}
      <div className='available-rides'>
        <h4>Available Rides</h4>
        {rides.length > 0 ? (
          <Row>
            {rides.map((ride) => (
              <Col key={ride._id} md={10}>
                <Card className='ride-card'>
                  <Card.Body>
                    <Card.Title>
                      {ride.startLocation} to {ride.endLocation}
                    </Card.Title>
                    <Card.Text>
                      <strong>Date:</strong>{' '}
                      {new Date(ride.rideDate).toLocaleDateString()}
                      <br />
                      <strong>Time:</strong>{' '}
                      {new Date(ride.rideTime).toLocaleTimeString()}
                      <br />
                      <strong>Available Seats:</strong> {ride.availableSeats}
                      <br />
                      <strong>Price:</strong> ₹{ride.price}
                    </Card.Text>
                    <Button
                      onClick={() => bookRide(ride._id)}
                      variant='success'
                      className='mt-2'
                    >
                      Book Ride
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p>No rides found that match your search.</p>
        )}
      </div>
    </div>
  );
};

export default SearchRides;

// import React, { useState, useEffect } from 'react';
// import { getAllRides, bookRide, searchRides } from '../../api/rideApi';
// import { Button, Form } from 'react-bootstrap';

// const SearchRides = () => {
//   const [searchData, setSearchData] = useState({
//     startLocation: '',
//     endLocation: '',
//   });
//   const [rides, setRides] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setSearchData({
//       ...searchData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       let foundRides;

//       foundRides = await searchRides(
//         searchData.startLocation,
//         searchData.endLocation
//       );
//       setRides(foundRides);
//     } catch (error) {
//       console.error('Error searching for rides:', error);
//     } finally {
//       setLoading(false);
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
//             placeholder='Enter starting location'
//           />
//         </Form.Group>

//         <Form.Group controlId='endLocation'>
//           <Form.Label>End Location</Form.Label>
//           <Form.Control
//             type='text'
//             name='endLocation'
//             value={searchData.endLocation}
//             onChange={handleChange}
//             placeholder='Enter destination location'
//           />
//         </Form.Group>

//         <Button type='submit' variant='primary'>
//           Search Rides
//         </Button>
//       </Form>

//       {loading && <p>Loading...</p>}

//       <div>
//         <h4>Available Rides</h4>
//         {rides.length > 0 ? (
//           <ul>
//             {rides.map((ride) => (
//               <li key={ride._id}>
//                 {ride.startLocation} to {ride.endLocation} on {ride.rideDate}
//                 <Button
//                   onClick={() => bookRide(ride._id)}
//                   variant='success'
//                   className='ml-2'
//                 >
//                   Book
//                 </Button>
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
