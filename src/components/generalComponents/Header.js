import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { getUserProfile } from '../../api/userApi'; // Make sure this import is correct

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem('token'));

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const userProfile = await getUserProfile(token); // Fetch user profile using the token
          setUser(userProfile); // Set the user state with the fetched data
          window.localStorage.setItem('user', JSON.stringify(userProfile)); // Optionally store in localStorage
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUser(null); // Reset user if there's an error
        }
      }
    };

    fetchUserProfile();
  }, [token, location.pathname]); // Fetch the profile whenever the token or route changes

  const handleLogout = () => {
    setToken(null); // Clear the token from state or localStorage
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
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
            <Nav.Link as={Link} to='/RideManagementPage'>
              Ride Management Page
            </Nav.Link>
            <Nav.Link as={Link} to='/contact'>
              Contact
            </Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {token ? (
              <>
                <Navbar.Text className='me-2'>
                  Signed in as: {user?.name}
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

// import React, { useEffect, useState } from 'react';
// import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// import { useNavigate, Link, useLocation } from 'react-router-dom';

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(window.localStorage.getItem('token'));

//   useEffect(() => {
//     const storedUser = window.localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, [token, location.pathname]);

//   const handleLogout = () => {
//     setToken(null); // Clear the token from state or localStorage
//     window.localStorage.removeItem('token');
//     window.localStorage.removeItem('user');
//     navigate('/'); // Redirect to onboarding or homepage
//     window.location.reload();
//   };

//   return (
//     <Navbar bg='light' expand='md' className='shadow-sm'>
//       <Container>
//         <Navbar.Brand as={Link} to='/' className='fw-bold text-primary'>
//           RideOK
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls='basic-navbar-nav' />
//         <Navbar.Collapse id='basic-navbar-nav'>
//           <Nav className='me-auto'>
//             <Nav.Link as={Link} to='/'>
//               Home
//             </Nav.Link>
//             <Nav.Link as={Link} to='/RideManagementPage'>
//               Ride Management Page
//             </Nav.Link>
//             <Nav.Link as={Link} to='/contact'>
//               Contact
//             </Nav.Link>
//           </Nav>
//           <Nav className='ms-auto'>
//             {token ? (
//               <>
//                 <Navbar.Text className='me-2'>
//                   Signed in as: {user?.name}
//                 </Navbar.Text>
//                 <Button
//                   variant='outline-danger'
//                   size='sm'
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <Button as={Link} to='/onboarding' variant='primary' size='sm'>
//                 Login / Register
//               </Button>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;
