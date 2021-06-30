import React from "react";
import "./Weather.css";
import "weather-icons/css/weather-icons.css";

const Weather = ({ weather }) => {
  return (
    <div>
      {weather.name.length !== 0 && (
        <div>
          <h2 className="name">
            {weather.name}, {weather.country}
          </h2>
          <i className={`wi ${weather.iconClass} icon`} />
          <h3 className="temp">{weather.temp}°C</h3>
          <h4>
            <span className="min-temp">{weather.temp_min}°C</span>
            <span className="max-temp">{weather.temp_max}°C</span>
          </h4>
          <h3 className="desc">{weather.desc}</h3>
        </div>
      )}
    </div>
  );
};

export default Weather;
