import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // Reset user state
    navigate('/login');
  };

  return (
    <Navbar bg='light' expand='md' className='shadow-sm'>
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to='/' className='fw-bold text-primary'>
          RideOK
        </Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle
          aria-controls='basic-navbar-nav'
          onClick={handleToggle}
        />

        {/* Navbar Collapse */}
        <Navbar.Collapse id='basic-navbar-nav' in={isOpen}>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
            {/* Add additional links here */}
          </Nav>

          <Nav className='ms-auto'>
            {user ? (
              <>
                <Nav.Item className='d-flex align-items-center me-3'>
                  <span className='text-muted'>Hello, {user.name}!</span>
                </Nav.Item>
                <Nav.Item>
                  <Button
                    variant='outline-danger'
                    size='sm'
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Nav.Item>
              </>
            ) : (
              <Nav.Item>
                <Button as={Link} to='/on-boarding' variant='primary' size='sm'>
                  Login
                </Button>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
