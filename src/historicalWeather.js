import React, { useEffect, useState } from 'react';

const HistoricalWeather = ({ latitude, longitude }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const startYear = new Date().getFullYear() - 10; // Start from 10 years ago
  const endYear = new Date().getFullYear();
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchHistoricalWeather = async () => {
      const data = [];

      // Fetch historical weather data for each year
      for (let year = startYear; year <= endYear; year++) {
        const startDate = `${year}-06-22`;
        const endDate = `${year}-06-22`;
        const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${59.80223888630046}&longitude=${18.307165183967516}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_mean&timezone=Europe%2FBerlin&timeformat=unixtime&min=2013-06-01&max=2023-06-22`;
        
        try {
          const response = await fetch(apiUrl);
          const result = await response.json();

          // Extract the mean temperature for the day
          const meanTemperature = result.daily.temperature_2m_mean;

          // Add fetched data to the array
          data.push(meanTemperature);
        } catch (error) {
          console.error(`Failed to fetch data for year ${year}`, error);
        }
      }

      // Update the state with the fetched historical data
      setHistoricalData(data);
    };

    fetchHistoricalWeather();
  }, [latitude, longitude]);

  return (
    <div>
      <h2>Historical Weather</h2>
      {historicalData.map((temperature, index) => (
        <div key={index}>
          <p>Year: {startYear + index}</p>
          <p>Temperature: {temperature} °C</p>
        </div>
      ))}
    </div>
  );
};

export default HistoricalWeather;
