import React, { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../components/generalComponents/authContext';

const Header = () => {
  const { state, logout } = useAuth();
  const { token, user } = state; // Accessing user and token from context
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Schedule My Ride', path: '/create-ride' },
    { name: 'My Rides', path: '/my-rides' },
    { name: 'Calculator', path: 'https://rideok.vercel.app/' },
    { name: 'About Us', path: 'https://ayush-verma-1708.netlify.app/' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload();
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='static' color='default'>
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor='left'
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                role='presentation'
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
                sx={{ width: 250 }}
              >
                <List>
                  {navLinks.map((link) => (
                    <ListItem key={link.name} disablePadding>
                      <ListItemButton component={Link} to={link.path}>
                        <ListItemText primary={link.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
            <Typography
              variant='h6'
              component={Link}
              to='/'
              sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
            >
              RideOK
            </Typography>
          </>
        ) : (
          <>
            <Typography
              variant='h6'
              component={Link}
              to='/'
              sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
            >
              RideOK
            </Typography>
            {navLinks.map((link) => (
              <Button
                key={link.name}
                component={Link}
                to={link.path}
                color='inherit'
              >
                {link.name}
              </Button>
            ))}
          </>
        )}
        {token ? (
          <>
            <IconButton
              edge='end'
              color='inherit'
              onClick={handleMenuOpen}
              size='large'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem>
                Signed in as: <strong>{user?.name || 'Loading...'}</strong>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            component={Link}
            to='/onboarding'
            variant='contained'
            color='primary'
          >
            Login / Register
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

// import React, { useEffect } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Button,
//   Menu,
//   MenuItem,
//   Box,
//   useMediaQuery,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
// } from '@mui/material';
// import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
// import { Link, useNavigate } from 'react-router-dom';
// import { useTheme } from '@mui/material/styles';
// import { useAuth } from '../../components/generalComponents/authContext';
// import { getUserProfile } from '../../api/userApi';

// const Header = () => {
//   const { state, setUser, logout } = useAuth();
//   const { token, user } = state;
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [drawerOpen, setDrawerOpen] = React.useState(false);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (token && !user) {
//         try {
//           const userProfile = await getUserProfile(token);
//           setUser(userProfile);
//           window.localStorage.setItem('user', JSON.stringify(userProfile));
//         } catch (error) {
//           console.error('Error fetching user profile:', error);
//         }
//       }
//     };

//     fetchUserProfile();
//   }, [token, user, setUser]);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//     window.location.reload();
//   };

//   const toggleDrawer = (open) => () => {
//     setDrawerOpen(open);
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'Schedule My Ride', path: '/create-ride' },
//     { name: 'My Rides', path: '/my-rides' },
//     { name: 'Contact', path: '/contact' },
//     { name: 'About Us', path: '/about-us' },
//   ];

//   return (
//     <AppBar position='static' color='default'>
//       <Toolbar>
//         {isMobile ? (
//           <>
//             <IconButton
//               edge='start'
//               color='inherit'
//               aria-label='menu'
//               onClick={toggleDrawer(true)}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Drawer
//               anchor='left'
//               open={drawerOpen}
//               onClose={toggleDrawer(false)}
//             >
//               <Box
//                 role='presentation'
//                 onClick={toggleDrawer(false)}
//                 onKeyDown={toggleDrawer(false)}
//                 sx={{ width: 250 }}
//               >
//                 <List>
//                   {navLinks.map((link) => (
//                     <ListItem key={link.name} disablePadding>
//                       <ListItemButton component={Link} to={link.path}>
//                         <ListItemText primary={link.name} />
//                       </ListItemButton>
//                     </ListItem>
//                   ))}
//                 </List>
//               </Box>
//             </Drawer>
//             <Typography
//               variant='h6'
//               component={Link}
//               to='/'
//               sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
//             >
//               RideOK
//             </Typography>
//           </>
//         ) : (
//           <>
//             <Typography
//               variant='h6'
//               component={Link}
//               to='/'
//               sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
//             >
//               RideOK
//             </Typography>
//             {navLinks.map((link) => (
//               <Button
//                 key={link.name}
//                 component={Link}
//                 to={link.path}
//                 color='inherit'
//               >
//                 {link.name}
//               </Button>
//             ))}
//           </>
//         )}
//         {token ? (
//           <>
//             <IconButton
//               edge='end'
//               color='inherit'
//               onClick={handleMenuOpen}
//               size='large'
//             >
//               <AccountCircle />
//             </IconButton>
//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleMenuClose}
//             >
//               <MenuItem>
//                 Signed in as: <strong>{user?.name || 'Loading...'}</strong>
//               </MenuItem>
//               <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             </Menu>
//           </>
//         ) : (
//           <Button
//             component={Link}
//             to='/onboarding'
//             variant='contained'
//             color='primary'
//           >
//             Login / Register
//           </Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

// // import React, { useEffect } from 'react';
// // import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// // import { useNavigate, Link, useLocation } from 'react-router-dom';
// // import { useAuth } from '../../components/generalComponents/authContext'; // Import the useAuth hook from context
// // import { getUserProfile } from '../../api/userApi'; // Make sure this import is correct

// // const Header = () => {
// //   const { state, setUser, logout } = useAuth(); // Access the auth context's state and functions
// //   const { token, user } = state; // Destructure token and user from state
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   useEffect(() => {
// //     const fetchUserProfile = async () => {
// //       if (token && !user) {
// //         // Only fetch the user if we have the token and no user set yet
// //         try {
// //           const userProfile = await getUserProfile(token); // Fetch user profile using the token
// //           setUser(userProfile); // Set the user state with the fetched data
// //           window.localStorage.setItem('user', JSON.stringify(userProfile)); // Optionally store in localStorage
// //         } catch (error) {
// //           console.error('Error fetching user profile:', error);
// //         }
// //       }
// //     };

// //     fetchUserProfile();
// //   }, [token, location.pathname, user, setUser]); // Fetch the profile whenever the token or route changes

// //   const handleLogout = () => {
// //     logout(); // Use logout function from context to handle the logout process
// //     navigate('/'); // Redirect to onboarding or homepage
// //     window.location.reload();
// //   };

// //   return (
// //     <Navbar bg='light' expand='md' className='shadow-sm'>
// //       <Container>
// //         <Navbar.Brand as={Link} to='/' className='fw-bold text-primary'>
// //           RideOK
// //         </Navbar.Brand>
// //         <Navbar.Toggle aria-controls='basic-navbar-nav' />
// //         <Navbar.Collapse id='basic-navbar-nav'>
// //           <Nav className='me-auto'>
// //             <Nav.Link as={Link} to='/'>
// //               Home
// //             </Nav.Link>
// //             <Nav.Link as={Link} to='/create-ride'>
// //               Schedule My Ride
// //             </Nav.Link>
// //             <Nav.Link as={Link} to='/my-rides'>
// //               My Rides
// //             </Nav.Link>
// //             <Nav.Link as={Link} to='/contact'>
// //               Contact
// //             </Nav.Link>
// //           </Nav>
// //           <Nav className='ms-auto'>
// //             {token ? (
// //               <>
// //                 <Navbar.Text className='me-2'>
// //                   Signed in as: {user?.name || 'Loading...'}
// //                 </Navbar.Text>
// //                 <Button
// //                   variant='outline-danger'
// //                   size='sm'
// //                   onClick={handleLogout}
// //                 >
// //                   Logout
// //                 </Button>
// //               </>
// //             ) : (
// //               <Button as={Link} to='/onboarding' variant='primary' size='sm'>
// //                 Login / Register
// //               </Button>
// //             )}
// //           </Nav>
// //         </Navbar.Collapse>
// //       </Container>
// //     </Navbar>
// //   );
// // };

// // export default Header;
