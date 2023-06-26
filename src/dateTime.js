import React from 'react';

const DateTime = () => {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Europe/Stockholm' // Set the time zone to Sweden
  };
  
  const currentDateTime = new Date().toLocaleString('sv-SE', options);

  return (
    <div>
      <h2>Date and Time</h2>
      <p>{currentDateTime}</p>
    </div>
  );
};

export default DateTime;

