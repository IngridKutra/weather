import React from 'react';
import Weather from './weather';
import DateTime from './dateTime';
import WeeklyWeather from './historicalWeather';
import HistoricalWeather from './historicalWeather';
import './styles.css';

const apiKey = process.env.REACT_APP_API_KEY;

const App = () => {

  const weeklyForecast = [
    {
      date: 'Monday',
      temperature: 22,
      description: 'Partly Cloudy',
      icon: '02d',
    },
    {
      date: 'Tuesday',
      temperature: 24,
      description: 'Sunny',
      icon: '01d',
    },
    // Add more days as needed
  ];

  return (
    <div className="mainBlock">
      <div className="twoBlocks">
      <div className="weatherBlock">
      <Weather latitude={59.80223888630046} longitude={18.307165183967516} apiKey={apiKey} />
{/* 
      <Weather temperature={currentWeather.temperature} description={currentWeather.description} icon={currentWeather.icon} /> */}
      </div>
      <div className="dateTimeBlock">
      <DateTime />
      </div>
      </div>
      <div className="weeklyWeatherBlock">
      <HistoricalWeather/>
      </div>
    </div>
  );
};

export default App;
