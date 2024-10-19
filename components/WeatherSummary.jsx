import React from 'react';

const WeatherSummary = ({ data }) => {
  const calculateDailySummary = () => {
    // This is a placeholder. In a real application, you'd calculate this based on historical data.
    const summary = {};
    for (const city in data) {
      summary[city] = {
        avgTemp: data[city].main.temp,
        maxTemp: data[city].main.temp_max,
        minTemp: data[city].main.temp_min,
        dominantCondition: data[city].weather[0].main,
      };
    }
    return summary;
  };

  const summary = calculateDailySummary();

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Daily Weather Summary</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(summary).map(([city, cityData]) => (
          <div key={city} className="border p-2 rounded">
            <h3 className="font-bold">{city}</h3>
            <p>Avg Temp: {cityData.avgTemp.toFixed(1)}°C</p>
            <p>Max Temp: {cityData.maxTemp.toFixed(1)}°C</p>
            <p>Min Temp: {cityData.minTemp.toFixed(1)}°C</p>
            <p>Dominant Condition: {cityData.dominantCondition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherSummary;
