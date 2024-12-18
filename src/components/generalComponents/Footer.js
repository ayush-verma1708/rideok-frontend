import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-dark text-light py-4'>
      <Container>
        <Row>
          {/* About Section */}
          <Col md={4} className='mb-3'>
            <h5>About RideOK</h5>
            <p>
              RideOK is a carpooling platform that helps you save money, reduce
              traffic, and lower CO2 emissions by sharing rides with others.
            </p>
          </Col>

          {/* Navigation Links */}
          <Col md={4} className='mb-3'>
            <h5>Quick Links</h5>
            <Nav className='flex-column'>
              <Nav.Link as={Link} to='/about' className='text-light'>
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to='/rides' className='text-light'>
                Find a Ride
              </Nav.Link>
              <Nav.Link as={Link} to='/create' className='text-light'>
                Offer a Ride
              </Nav.Link>
              <Nav.Link as={Link} to='/terms' className='text-light'>
                Terms of Service
              </Nav.Link>
              <Nav.Link as={Link} to='/privacy' className='text-light'>
                Privacy Policy
              </Nav.Link>
            </Nav>
          </Col>

          {/* Social Media Links */}
          <Col md={4} className='mb-3'>
            <h5>Connect with Us</h5>
            <Nav className='justify-content-start'>
              <Nav.Link
                href='https://facebook.com'
                target='_blank'
                className='text-light'
              >
                <i className='fab fa-facebook fa-lg'></i>
              </Nav.Link>
              <Nav.Link
                href='https://twitter.com'
                target='_blank'
                className='text-light'
              >
                <i className='fab fa-twitter fa-lg'></i>
              </Nav.Link>
              <Nav.Link
                href='https://instagram.com'
                target='_blank'
                className='text-light'
              >
                <i className='fab fa-instagram fa-lg'></i>
              </Nav.Link>
              <Nav.Link
                href='https://linkedin.com'
                target='_blank'
                className='text-light'
              >
                <i className='fab fa-linkedin fa-lg'></i>
              </Nav.Link>
            </Nav>
          </Col>
        </Row>

        {/* Bottom Footer */}
        <Row className='mt-3'>
          <Col className='text-center'>
            <p className='mb-0'>
              &copy; {new Date().getFullYear()} RideOK. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
