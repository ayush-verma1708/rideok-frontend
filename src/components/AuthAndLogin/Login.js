import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/userApi'; // Assuming the API functions are in 'api.js'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Email:', email); // Debugging line
    console.log('Password:', password); // Debugging line
    try {
      const data = await loginUser(email, password);
      console.log('Response data:', data); // Debugging line
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('user', JSON.stringify(data));
      setEmail('');
      setPassword('');
      navigate('/'); // Redirect to homepage
    } catch (err) {
      console.error('Login error:', err); // Debugging line
      setError('Invalid credentials');
    }
    window.location.reload();
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
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit' className='w-100'>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
