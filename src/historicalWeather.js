import React, { useEffect, useState } from 'react';

const HistoricalWeather = ({ latitude, longitude }) => {
  const [historicalData, setHistoricalData] = useState([]);
  /* const startYear = 2019; // Declare startYear outside useEffect */
  const startYear = new Date().getFullYear() - 10; // Start from 10 years ago
  const endYear = new Date().getFullYear();
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchHistoricalWeather = async () => {
      /* const endYear = startYear + 4;  */// Fetch data for 5 years

      // Array to store the fetched historical data
      const data = [];

      // Fetch historical weather data for each year
      for (let year = startYear; year <= endYear; year++) {
        const timestamp = Math.floor(new Date(`${year}-06-22T12:00:00`).getTime() / 1000); // Convert date to timestamp (fixed day and time: June 22nd, 12:00:00)

        // Make API call for each year
        const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${59.80223888630046}&longitude=${18.307165183967516}&start_date=${year}-06-22&end_date=${year}-06-22&hourly=temperature_2m`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        // Add fetched data to the array
        data.push(result.hourly.temperature_2m);
      }

      // Update the state with the fetched historical data
      setHistoricalData(data);
    };

    fetchHistoricalWeather();
  }, [latitude, longitude]);

  return (
    <div>
      <h2>Historical Weather</h2>
      {historicalData.map((temperatures, index) => (
        <div key={index}>
          <p>Year: {startYear + index}</p>
          <p>Temperature: {temperatures.join(', ')} °C</p>
          {/* Display the relevant weather information for each year */}
        </div>
      ))}
    </div>
  );
};

export default HistoricalWeather;
