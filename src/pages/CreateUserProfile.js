import React, { useState } from 'react';

const CreateUserProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Profile Created:', formData);
    // Add your form submission logic here
  };

  return (
    <div>
      <h1>Create User Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea name='bio' value={formData.bio} onChange={handleChange} />
        </div>
        <button type='submit'>Create Profile</button>
      </form>
    </div>
  );
};

export default CreateUserProfile;
