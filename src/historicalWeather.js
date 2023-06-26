import React, { useEffect, useState, useRef } from 'react';
import { Chart, LineController, LineElement, LinearScale, PointElement } from 'chart.js';


const HistoricalWeather = ({ latitude, longitude }) => {
  const chartRef = useRef(null);
  const [historicalData, setHistoricalData] = useState([]);
  const startYear = new Date().getFullYear() - 10; // Start from 10 years ago
  const endYear = new Date().getFullYear();
  const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in the format "YYYY-MM-DD"
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchHistoricalWeather = async () => {
      const data = [];

      // Fetch historical weather data for each year
      for (let year = startYear; year <= endYear; year++) {
        const startDate = `${year}-${currentDate.substr(5)}`; // Use the current year and month, and the day from currentDate
        const endDate = `${year}-${currentDate.substr(5)}`;
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
  }, [latitude, longitude, startYear, endYear, currentDate]);

  useEffect(() => {
    if (historicalData.length > 0 && chartRef.current) {
      // Extract the years from startYear to endYear
      const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

      // Extract the temperatures from historicalData
      const temperatures = historicalData.map((temperature, index) => ({
        x: years[index],
        y: temperature
      }));

      // Create the chart
      // Create the chart configuration
      const chartConfig = {
        type: 'line',
        data: {
          labels: years.map((year) => String(year)),
          datasets: [
            {
              label: 'Temperature',
              data: temperatures,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Year'
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10
              }
            },
            y: {
              title: {
                display: true,
                text: 'Temperature (°C)'
              },
              ticks: {
                stepSize: 1,
              }
            }}
        },
      };

      // Create the chart
      new Chart(chartRef.current, chartConfig);
    }
  }, [historicalData]);

  return <canvas ref={chartRef} />;
};

export default HistoricalWeather;
