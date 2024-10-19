import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import WeatherDashboard from '../components/WeatherDashboard';
import AlertConfig from '../components/AlertConfig';
import WeatherSummary from '../components/WeatherSummary';
import WeatherChart from '../components/WeatherChart';

const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes

export default function Home() {
  const [weatherData, setWeatherData] = useState({});
  const [alertConfig, setAlertConfig] = useState({ temperature: 35 });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const newData = {};
      for (const city of CITIES) {
        const response = await fetch(`/api/weather?city=${city}`);
        const data = await response.json();
        newData[city] = data;
      }
      setWeatherData(newData);
      checkAlerts(newData);
    };

    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const checkAlerts = (data) => {
    const newAlerts = [];
    for (const city in data) {
      if (data[city].main.temp > alertConfig.temperature) {
        newAlerts.push(`Alert: Temperature in ${city} exceeds ${alertConfig.temperature}°C`);
      }
    }
    setAlerts(newAlerts);
  };

  return (
    <div>
      <Head>
        <title>Weather Monitoring System</title>
        <meta name='description' content='Real-time weather monitoring system' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className="p-4">
        <h1 className="text-3xl font-bold mb-4">Weather Monitoring System</h1>
        <AlertConfig config={alertConfig} setConfig={setAlertConfig} />
        <WeatherDashboard data={weatherData} />
        <WeatherSummary data={weatherData} />
        <WeatherChart data={weatherData} />
        {alerts.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Alerts</h2>
            <ul>
              {alerts.map((alert, index) => (
                <li key={index} className="text-red-500">{alert}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
