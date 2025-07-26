import React, { useState } from 'react';
import './App.css';
import './index.css'; 

const API_KEY = "ebb6e980a7b5f209a48f1df5c0541a6c"; // Replace with your OpenWeatherMap API Key

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=standard`
      );
      const data = await response.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 flex flex-col items-center justify-center p-6">
      <div className="bg-white bg-opacity-80 rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">🌤️ Weather Forecast</h1>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {weather && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold mb-2">{weather.name}, {weather.sys.country}</h2>
            <div className="flex flex-col items-center">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                className="w-20 h-20"
              />
              <p className="capitalize text-lg mb-2">{weather.weather[0].description}</p>
            </div>
            <p className="text-4xl font-bold">{weather.main.temp}°C</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-blue-800">
              <p>Humidity: <span className="font-semibold">{weather.main.humidity}%</span></p>
              <p>Wind Speed: <span className="font-semibold">{weather.wind.speed} m/s</span></p>
              <p>Pressure: <span className="font-semibold">{weather.main.pressure} hPa</span></p>
              <p>Feels Like: <span className="font-semibold">{weather.main.feels_like}°C</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
