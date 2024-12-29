import './App.css';
import { useEffect, useState, useCallback } from 'react';

function App() {
  const [search, setSearch] = useState("chennai");
  const [city, setCity] = useState(null);
  const [error, setError] = useState("");

  // Define getWeatherData with useCallback to avoid unnecessary re-creation of the function
  const getWeatherData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=9e2f483b43a855cabbdf6c768ba639dd&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const result = await response.json();
      setCity(result);
      setError(""); // Clear any previous errors
    } catch (err) {
      setCity(null);
      setError(err.message);
    }
  }, [search]); // Dependency on search

  useEffect(() => {
    getWeatherData();
  }, [getWeatherData]); // Add getWeatherData as a dependency

  const handleCityChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <div className="weather-card">
        <div className="search">
          <input
            type="search"
            placeholder="Enter city name"
            spellCheck="false"
            onChange={handleCityChange}
          />
<button
   onClick={getWeatherData}
   style={{
     color: "white",
     backgroundColor: "transparent", // Make button background transparent
     border: "none",
     padding: "10px 20px",
     marginRight:"10px",
     cursor: "pointer",
     fontSize: "16px"
  }}>Enter</button> </div>
        {error && <p className="error">{error}</p>}
        {city && (
          <div className="weather">
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
              alt={city.weather[0].description}
            />
            <h1 className="temp">{city.main.temp.toFixed(1)}°C</h1>
            <h2 className="city">{city.name}</h2>
            <div className="details">
              <div style={{ display: "flex" }} className="col">
                <img
                  className="humi"
                  src="https://static-00.iconduck.com/assets.00/humidity-icon-2048x1675-xxsge5os.png"
                  alt="Humidity icon"
                />
                <div className="info">
                  <p className="humidity">{city.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/136/136712.png"
                  alt="Wind speed icon"
                />
                <div className="info">
                  <p className="wind">{(city.wind.speed * 3.6).toFixed(2)} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
