// src/components/SignUp.js
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

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Initialize reCAPTCHA for phone verification
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
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
      console.log('User signed up with phone:', user);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid OTP');
    }
  };

  // Google Sign-Up handler
  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User signed up with Google:', user);
      navigate('/dashboard');
    } catch (error) {
      setError('Google sign-up failed');
    }
  };

  return (
    <div>
      <h3 className='text-center mb-3'>Sign Up</h3>
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
        <Button variant='secondary' onClick={handleGoogleSignUp}>
          Sign Up with Google
        </Button>
      </div>
    </div>
  );
};

export default SignUp;

// import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { registerUser } from '../../api/userApi'; // Assuming the API functions are in 'api.js'

// const Register = () => {
//   const [userData, setUserData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await registerUser(userData);
//       window.localStorage.setItem('token', data.token);
//       window.localStorage.setItem('user', JSON.stringify(data));
//       setUserData({ name: '', email: '', password: '' });
//       navigate('/'); // Redirect to homepage
//     } catch (err) {
//       setError('Registration failed');
//     }
//   };

//   return (
//     <div>
//       <h3 className='text-center mb-3'>Register</h3>
//       {error && <Alert variant='danger'>{error}</Alert>}
//       <Form onSubmit={handleRegister}>
//         <Form.Group className='mb-3' controlId='formBasicName'>
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Enter name'
//             value={userData.name}
//             onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//           />
//         </Form.Group>
//         <Form.Group className='mb-3' controlId='formBasicEmail'>
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type='email'
//             placeholder='Enter email'
//             value={userData.email}
//             onChange={(e) =>
//               setUserData({ ...userData, email: e.target.value })
//             }
//           />
//         </Form.Group>
//         <Form.Group className='mb-3' controlId='formBasicPassword'>
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Password'
//             value={userData.password}
//             onChange={(e) =>
//               setUserData({ ...userData, password: e.target.value })
//             }
//           />
//         </Form.Group>
//         <Button variant='primary' type='submit' className='w-100'>
//           Register
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default Register;
