import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/userApi';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const userData = await registerUser(formData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className='text-center mb-3'>Register</h3>
      {error && <div className='alert alert-danger'>{error}</div>}
      <form onSubmit={handleSubmit}>
        <InputField
          label='Name'
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          label='Email'
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label='Password'
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type='submit'
          className='btn btn-primary w-100'
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;

// Shared Input Field Component (Reused from Login)
const InputField = ({ label, type, name, value, onChange }) => (
  <div className='mb-3'>
    <label className='form-label'>{label}</label>
    <input
      type={type}
      name={name}
      className='form-control'
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { registerUser } from '../api/userApi'; // Updated import path

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Call registerUser and get the data directly
//       const userData = await registerUser({ name, email, password });

//       // Save user info and token to local storage
//       localStorage.setItem('user', JSON.stringify(userData));
//       localStorage.setItem('token', userData.token); // Store JWT token for protected routes

//       navigate('/'); // Redirect to homepage after successful registration
//     } catch (error) {
//       // Improved error handling
//       setError(error.response?.data?.message || 'Error during registration');
//     }
//   };

//   return (
//     <div className='container'>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div className='mb-3'>
//           <label className='form-label'>Name</label>
//           <input
//             type='text'
//             className='form-control'
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div className='mb-3'>
//           <label className='form-label'>Email</label>
//           <input
//             type='email'
//             className='form-control'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className='mb-3'>
//           <label className='form-label'>Password</label>
//           <input
//             type='password'
//             className='form-control'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type='submit' className='btn btn-primary'>
//           Register
//         </button>
//         {error && <p className='text-danger mt-3'>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default Register;
