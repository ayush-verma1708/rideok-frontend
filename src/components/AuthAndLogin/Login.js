// src/components/Login.js
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
} from '../../fireBaseConfig/fireBase.js';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Initialize reCAPTCHA for phone verification
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible', // Invisible reCAPTCHA
      },
      auth
    );
  };

  // Phone number submission handler
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setupRecaptcha();
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );
      window.confirmationResult = confirmationResult;
    } catch (error) {
      setError('Phone verification failed');
    }
  };

  // OTP verification handler
  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await window.confirmationResult.confirm(verificationCode);
      const user = result.user;
      console.log('User logged in with phone:', user);
      navigate('/dashboard'); // Redirect to another page after successful login
    } catch (error) {
      setError('Invalid OTP');
    }
  };

  // Google Sign-In handler
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User logged in with Google:', user);
      navigate('/dashboard'); // Redirect after successful login
    } catch (error) {
      setError('Google login failed');
    }
  };

  return (
    <div>
      <h3 className='text-center mb-3'>Login</h3>
      {error && <Alert variant='danger'>{error}</Alert>}

      {!verificationCode ? (
        <Form onSubmit={handlePhoneSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter phone number'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='w-100'>
            Verify Phone Number
          </Button>
        </Form>
      ) : (
        <Form onSubmit={handleVerificationSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Verification Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter OTP'
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='w-100'>
            Verify OTP
          </Button>
        </Form>
      )}

      <div className='text-center mt-4'>
        <Button variant='secondary' onClick={handleGoogleSignIn}>
          Login with Google
        </Button>
      </div>
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
