import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = "4dcd503cb2a049aebbf70609240205";

  const fetchData = () => {
    setLoading(true);
    setError('');

    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(window.alert('Failed to fetch weather data'));
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='container'>
      <div className="search-container">
        <input
          type="text"
          placeholder='Enter city Name'
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button onClick={fetchData}>Search</button>
      </div>

      {loading && <p>Loading data...</p>}
      
      {error && <p>{error}</p>}
      
      {weatherData && (
        <div className='weather-container'> {/* Corrected class name */}
          <div className='weather-card'>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
          </div>
          <div className='weather-card'>
            <p>Humidity: {weatherData.current.humidity}%</p>
          </div>
          <div className='weather-card'>
            <p>Condition: {weatherData.current.condition.text}</p>
          </div>
          <div className='weather-card'>
            <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
