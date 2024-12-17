import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/userApi';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const userData = await loginUser(formData.email, formData.password);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className='text-center mb-3'>Login</h3>
      {error && <div className='alert alert-danger'>{error}</div>}
      <form onSubmit={handleSubmit}>
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;

// Shared Input Field Component
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
// import { loginUser } from '../api/userApi.js'; // Import from updated API file

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); // Loading state
//   const navigate = useNavigate();

//   // Handle Input Changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle Form Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Activate loading state
//     setError(''); // Reset error state

//     try {
//       const userData = await loginUser(formData.email, formData.password);

//       // Save user info and token to localStorage
//       localStorage.setItem('user', JSON.stringify(userData));
//       localStorage.setItem('token', userData.token);

//       navigate('/'); // Redirect to homepage after login
//     } catch (error) {
//       const errorMsg =
//         error.response?.data?.message ||
//         'An unexpected error occurred during login.';
//       setError(errorMsg);
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div className='container mt-5'>
//       <div className='row justify-content-center'>
//         <div className='col-md-6'>
//           <div className='card p-4 shadow-sm'>
//             <h2 className='text-center mb-4'>Login</h2>

//             {/* Error Message */}
//             {error && <div className='alert alert-danger'>{error}</div>}

//             {/* Form */}
//             <form onSubmit={handleSubmit}>
//               <div className='mb-3'>
//                 <label htmlFor='email' className='form-label'>
//                   Email
//                 </label>
//                 <input
//                   type='email'
//                   name='email'
//                   id='email'
//                   className='form-control'
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className='mb-3'>
//                 <label htmlFor='password' className='form-label'>
//                   Password
//                 </label>
//                 <input
//                   type='password'
//                   name='password'
//                   id='password'
//                   className='form-control'
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <button
//                 type='submit'
//                 className='btn btn-primary w-100'
//                 disabled={loading} // Disable button while loading
//               >
//                 {loading ? 'Logging in...' : 'Login'}
//               </button>
//             </form>

//             {/* Optional Links */}
//             <div className='text-center mt-3'>
//               <small>
//                 Don't have an account?{' '}
//                 <a href='/register' className='text-primary'>
//                   Register here
//                 </a>
//               </small>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
