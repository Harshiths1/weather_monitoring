import React from 'react';
import Weather from './Weather';

const WeatherDashboard = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Object.entries(data).map(([city, weatherData]) => (
        <Weather key={city} data={weatherData} city={city} />
      ))}
    </div>
  );
};

export default WeatherDashboard;
