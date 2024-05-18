import React, { useState } from 'react';

const Home = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!location) {
      setError('Please enter a location');
      return;
    }

    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${location}&format=json&u=f`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '588a15d329msh4a16a27af05edd5p100bf4jsn40205c3af33b',
        'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const result = await response.json();
      setWeatherData(result);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data');
    }
    setLocation("")
  };

  return (
    <div className='HomePage' style={{ height: '100vh'}}>
      <div className='text-center py-3 text-white ' style={{fontFamily:'monospace'}}><h1>Weather Report</h1></div>
      <div className='Box' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div>
        <div className="d-flex justify-content-center align-items-center mb-3 py-3">
          <div className="search">
            <input placeholder="Search Location...." type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            <button type="submit" onClick={handleSearch}><img src='https://cdn-icons-png.flaticon.com/512/3845/3845731.png' alt='search' style={{width:'28px',height:'26px'}} /></button>
          </div>
        </div>
        {error && <p>{error}</p>}
        {weatherData && (
          <div className="d-flex justify-content-center align-items-center">
            <div className="card">
              <div className="container">
                <div className="cloud front">
                  <span className="left-front"></span>
                  <span className="right-front"></span>
                </div>
                <span className="sun sunshine"></span>
                <span className="sun"></span>
                <div className="cloud back">
                  <span className="left-back"></span>
                  <span className="right-back"></span>
                </div>
              </div>
              <div className="card-header">
                <span style={{color:'#2b4353'}}>{weatherData.location.city}, {weatherData.location.country}</span>
                <span style={{color:'#2c786c'}}>{weatherData.current_observation.condition.text}</span>
              </div>
              <span className="temp">{((weatherData.current_observation.condition.temperature - 32) * 5 / 9).toFixed(2)} °C</span>
            </div>
          </div>
        )}
      </div></div>
    </div>
  );
};

export default Home;
