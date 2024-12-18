import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Button,
  Container,
  Card,
  Row,
  Col,
  Carousel,
} from 'react-bootstrap';

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      {/* Main Content */}
      <Container className='py-5'>
        <h1 className='text-center mb-4'>Welcome to RideOK</h1>
        {user ? (
          <h2 className='text-center mb-4'>Hello, {user.name}!</h2>
        ) : (
          <h3 className='text-center mb-4'>
            Start sharing rides to save costs and the environment!
          </h3>
        )}

        {/* Carousel Section */}
        <Carousel className='mb-5'>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src='https://via.placeholder.com/800x400?text=Carpooling+Made+Easy'
              alt='First slide'
            />
            <Carousel.Caption>
              <h3>Carpooling Made Easy</h3>
              <p>Find and offer rides with ease.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src='https://via.placeholder.com/800x400?text=Save+Money+and+Time'
              alt='Second slide'
            />
            <Carousel.Caption>
              <h3>Save Money and Time</h3>
              <p>Share rides and reduce your travel costs.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src='https://via.placeholder.com/800x400?text=Eco-Friendly+Travel'
              alt='Third slide'
            />
            <Carousel.Caption>
              <h3>Eco-Friendly Travel</h3>
              <p>Reduce your carbon footprint by carpooling.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* Features Section */}
        <Row className='text-center'>
          <Col md={4}>
            <Card className='mb-4 shadow-sm'>
              <Card.Body>
                <Card.Title>Find a Ride</Card.Title>
                <Card.Text>
                  Search for carpool options on popular routes and save money.
                </Card.Text>
                <Link to='/rides'>
                  <Button variant='primary'>Find Rides</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='mb-4 shadow-sm'>
              <Card.Body>
                <Card.Title>Offer a Ride</Card.Title>
                <Card.Text>
                  Have empty seats? Offer a ride and share your costs.
                </Card.Text>
                <Link to='/create'>
                  <Button variant='primary'>Offer a Ride</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='mb-4 shadow-sm'>
              <Card.Body>
                <Card.Title>Track Your Rides</Card.Title>
                <Card.Text>
                  Manage and track all your rides from your profile.
                </Card.Text>
                <Link to='/profile'>
                  <Button variant='primary'>My Profile</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Additional Sections */}
        <Row className='text-center mt-5'>
          <Col md={6}>
            <Card className='mb-4 shadow-sm'>
              <Card.Body>
                <Card.Title>Why Carpool?</Card.Title>
                <Card.Text>
                  Carpooling helps reduce traffic congestion, save money, and
                  protect the environment.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className='mb-4 shadow-sm'>
              <Card.Body>
                <Card.Title>Testimonials</Card.Title>
                <Card.Text>
                  Hear from our satisfied users about their carpooling
                  experiences.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
