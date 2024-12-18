import React, { useState } from 'react';
import CreateRide from '../components/ridesAndDetails/CreateRide.js';
import MyRides from '../components/ridesAndDetails/MyRides.js';
import BookRide from '../components/ridesAndDetails/BookRide.js';
import SearchRides from '../components/ridesAndDetails/SearchRides.js';
import UpdateRide from '../components/ridesAndDetails/UpdateRide.js';
import DeleteRide from '../components/ridesAndDetails/DeleteRide.js';
import { Container, Row, Col, Card } from 'react-bootstrap';

const RideManagementPage = () => {
  const [selectedRideId, setSelectedRideId] = useState(null);

  const handleRideSelection = (rideId) => {
    setSelectedRideId(rideId);
  };

  return (
    <Container className='mt-5'>
      <Row>
        {/* <Col md={4}>
          <Card>
            <Card.Header>Create a Ride</Card.Header>
            <Card.Body>
              <CreateRide />
            </Card.Body>
          </Card>
        </Col> */}
        {/* <Col md={4}>
          <Card>
            <Card.Header>My Rides</Card.Header>
            <Card.Body>
              <MyRides onRideSelect={handleRideSelection} />
            </Card.Body>
          </Card>
        </Col> */}

        {/* <Col md={4}>
          <Card>
            <Card.Header>Update Ride</Card.Header>
            <Card.Body>
              {selectedRideId ? (
                <UpdateRide rideId={selectedRideId} />
              ) : (
                <p>Select a ride to update</p>
              )}
            </Card.Body>
          </Card>
        </Col> */}
      </Row>

      <Col md={12}>
        <Card>
          <Card.Header>Search for Rides</Card.Header>
          <Card.Body>
            <SearchRides onRideSelect={handleRideSelection} />
          </Card.Body>
        </Card>
      </Col>

      <Row className='mt-4'>
        <Col md={6}>
          <Card>
            <Card.Header>Delete Ride</Card.Header>
            <Card.Body>
              {selectedRideId ? (
                <DeleteRide rideId={selectedRideId} />
              ) : (
                <p>Select a ride to delete</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header>Book Ride</Card.Header>
            <Card.Body>
              {selectedRideId ? (
                <BookRide rideId={selectedRideId} />
              ) : (
                <p>Select a ride to book</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RideManagementPage;
