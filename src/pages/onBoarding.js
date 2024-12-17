import React, { useState } from 'react';
import Login from '../components/AuthAndLogin/Login';
import Register from '../components/AuthAndLogin/Register';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './onboarding.css'; // Import the CSS file for additional styling

const Onboarding = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <Container className='mt-5'>
        <Row className='d-flex align-items-center'>
          <Col md={6} className='text-center mb-5'>
            <h2 className='onboarding-title'>Welcome to RideOK</h2>
            <p className='onboarding-subtitle'>
              Join us and start your carpool journey!
            </p>
          </Col>
          <Col md={6}>
            <Card className='onboarding-card p-5 shadow-lg'>
              <div className='d-flex justify-content-center mb-4'>
                <Button
                  variant={isLogin ? 'primary' : 'outline-primary'}
                  onClick={() => setIsLogin(true)}
                  className='me-2 onboarding-button'
                >
                  Login
                </Button>
                <Button
                  variant={!isLogin ? 'primary' : 'outline-primary'}
                  onClick={() => setIsLogin(false)}
                  className='onboarding-button'
                >
                  Register
                </Button>
              </div>
              {isLogin ? (
                <div>
                  <Login />
                </div>
              ) : (
                <div>
                  <Register />
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Onboarding;
