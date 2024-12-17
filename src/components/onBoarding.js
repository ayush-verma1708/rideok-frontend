import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Onboarding = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className='container mt-5'>
      <div className='text-center mb-4'>
        <h2>Welcome to RideOK</h2>
        <p>Join us and start your carpool journey!</p>
      </div>

      {/* Toggle Buttons */}
      <div className='d-flex justify-content-center mb-4'>
        <button
          className={`btn mx-2 ${
            showLogin ? 'btn-primary' : 'btn-outline-primary'
          }`}
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
        <button
          className={`btn mx-2 ${
            !showLogin ? 'btn-primary' : 'btn-outline-primary'
          }`}
          onClick={() => setShowLogin(false)}
        >
          Register
        </button>
      </div>

      {/* Forms */}
      <div className='card p-4 shadow'>
        {showLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Onboarding;

// import React, { useState } from 'react';
// import Login from './Login';
// import Register from './Register';

// const Onboarding = () => {
//   const [showLogin, setShowLogin] = useState(true); // State to toggle between forms

//   return (
//     <div className='container mt-5'>
//       <div className='text-center mb-4'>
//         <h2>Welcome to RideOK</h2>
//         <p>Register or Login to continue</p>
//       </div>

//       {/* Toggle Buttons */}
//       <div className='d-flex justify-content-center mb-4'>
//         <button
//           className={`btn ${
//             showLogin ? 'btn-primary' : 'btn-outline-primary'
//           } mx-2`}
//           onClick={() => setShowLogin(true)}
//         >
//           Login
//         </button>
//         <button
//           className={`btn ${
//             !showLogin ? 'btn-primary' : 'btn-outline-primary'
//           } mx-2`}
//           onClick={() => setShowLogin(false)}
//         >
//           Register
//         </button>
//       </div>

//       {/* Conditional Rendering of Forms */}
//       <div className='card p-4'>{showLogin ? <Login /> : <Register />}</div>
//     </div>
//   );
// };

// export default Onboarding;
