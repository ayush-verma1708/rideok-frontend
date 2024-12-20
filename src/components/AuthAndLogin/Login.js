import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/userApi'; // Assuming the API functions are in 'api.js'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    setLoading(true); // Show loading spinner while logging in
    try {
      const data = await loginUser(email, password);
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('user', JSON.stringify(data));
      setEmail('');
      setPassword('');
      setError(''); // Clear previous errors
      navigate('/'); // Redirect to homepage
    } catch (err) {
      console.error('Login error:', err); // Debugging line
      setError('Invalid credentials'); // Set error message
    } finally {
      setLoading(false); // Hide loading spinner after request completion
    }
    window.location.reload();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div>
      <h3 className='text-center mb-3'>Login</h3>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <div className='d-flex'>
            <Form.Control
              type={passwordVisible ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              variant='link'
              onClick={togglePasswordVisibility}
              className='ml-2'
              style={{ alignSelf: 'center' }}
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </Button>
          </div>
        </Form.Group>

        <Button
          variant='primary'
          type='submit'
          className='w-100'
          disabled={loading}
        >
          {loading ? <Spinner animation='border' size='sm' /> : 'Login'}
        </Button>
      </Form>
    </div>
  );
};

export default Login;

// import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../../api/userApi'; // Assuming the API functions are in 'api.js'

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await loginUser(email, password);
//       console.log('Response data:', data); // Debugging line
//       window.localStorage.setItem('token', data.token);
//       window.localStorage.setItem('user', JSON.stringify(data));
//       setEmail('');
//       setPassword('');
//       navigate('/'); // Redirect to homepage
//     } catch (err) {
//       console.error('Login error:', err); // Debugging line
//       setError('Invalid credentials');
//     }
//     window.location.reload();
//   };

//   return (
//     <div>
//       <h3 className='text-center mb-3'>Login</h3>
//       {error && <Alert variant='danger'>{error}</Alert>}
//       <Form onSubmit={handleLogin}>
//         <Form.Group className='mb-3' controlId='formBasicEmail'>
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type='email'
//             placeholder='Enter email'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group className='mb-3' controlId='formBasicPassword'>
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Group>
//         <Button variant='primary' type='submit' className='w-100'>
//           Login
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default Login;
