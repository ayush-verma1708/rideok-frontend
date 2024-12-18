import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CreateRide from '../components/ridesAndDetails/CreateRide';

const CreateRidePage = () => {
  return (
    <Container>
      <Row className='justify-content-center my-5'>
        <Col xs={12} md={8} lg={6}>
          <h2>Schedule a Ride</h2>
          <CreateRide />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateRidePage;
