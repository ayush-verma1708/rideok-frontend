import React, { useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/generalComponents/authContext'; // Import the useAuth hook from context
import { getUserProfile } from '../../api/userApi'; // Make sure this import is correct

const Header = () => {
  const { state, setUser, logout } = useAuth(); // Access the auth context's state and functions
  const { token, user } = state; // Destructure token and user from state
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token && !user) {
        // Only fetch the user if we have the token and no user set yet
        try {
          const userProfile = await getUserProfile(token); // Fetch user profile using the token
          setUser(userProfile); // Set the user state with the fetched data
          window.localStorage.setItem('user', JSON.stringify(userProfile)); // Optionally store in localStorage
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [token, location.pathname, user, setUser]); // Fetch the profile whenever the token or route changes

  const handleLogout = () => {
    logout(); // Use logout function from context to handle the logout process
    navigate('/'); // Redirect to onboarding or homepage
    window.location.reload();
  };

  return (
    <Navbar bg='light' expand='md' className='shadow-sm'>
      <Container>
        <Navbar.Brand as={Link} to='/' className='fw-bold text-primary'>
          RideOK
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/create-ride'>
              Schedule My Ride
            </Nav.Link>
            <Nav.Link as={Link} to='/my-rides'>
              My Rides
            </Nav.Link>
            <Nav.Link as={Link} to='/contact'>
              Contact
            </Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {token ? (
              <>
                <Navbar.Text className='me-2'>
                  Signed in as: {user?.name || 'Loading...'}
                </Navbar.Text>
                <Button
                  variant='outline-danger'
                  size='sm'
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button as={Link} to='/onboarding' variant='primary' size='sm'>
                Login / Register
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
