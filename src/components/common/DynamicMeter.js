import React, { useEffect, useState } from 'react';
// import { getCO2Savings } from '../../api/userApi.js'; // API call to fetch CO2 savings

const getCO2Savings = async () => {
  const response = await axios.get(`${API_URL}/users/co2-savings`);
  return response.data.totalSavings;
};

const DynamicMeter = () => {
  const [co2Savings, setCo2Savings] = useState(0);

  useEffect(() => {
    const fetchCo2Savings = async () => {
      try {
        const totalSavings = await getCO2Savings(); // API call returns total CO2 savings
        setCo2Savings(totalSavings);
      } catch (error) {
        console.error('Error fetching CO2 savings:', error);
      }
    };

    fetchCo2Savings();
  }, []);

  return (
    <div className='co2-meter-container'>
      <h3>🌍 Total CO₂ Saved</h3>
      <div className='meter'>
        <div
          className='meter-fill'
          style={{ width: `${Math.min(co2Savings / 100, 100)}%` }} // Scale to a maximum of 100%
        ></div>
      </div>
      <p className='savings-info'>
        <strong>{co2Savings.toFixed(2)} kg</strong> of CO₂ saved by our users!
      </p>
    </div>
  );
};

export default DynamicMeter;
