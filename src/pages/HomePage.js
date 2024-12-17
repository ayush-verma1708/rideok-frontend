import React from 'react';

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className='container'>
      <h1>Welcome to RideOk</h1>
      {user && <h2>Hello, {user.name}!</h2>}
    </div>
  );
};

export default HomePage;
