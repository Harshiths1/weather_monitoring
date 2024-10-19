import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: Object.values(data).map(cityData => cityData.main.temp),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Current Temperature Across Cities',
      },
    },
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Temperature Chart</h2>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default WeatherChart;
