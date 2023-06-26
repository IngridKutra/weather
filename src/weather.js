import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Weather = ({ latitude, longitude}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${59.80223888630046}&lon=${18.307165183967516}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        setError('Error fetching weather data.');
      }
    };

    fetchData();
  }, [latitude, longitude, apiKey]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!weatherData) {
    return <p>Loading...</p>;
  }

  const { main, description, icon } = weatherData.weather[0];
  const temperature = weatherData.main.temp;

  return (
    <div>
      <h2>Current Weather in Rånäs</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Description: {description}</p>
      <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="Weather Icon" />
    </div>
  );
};

export default Weather;
