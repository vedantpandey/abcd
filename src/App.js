import "./App.css";
import { useState } from "react";
import { div } from "prelude-ls";
import Weather from "./Weather";

const api = {
  key: "f3b925b8a7a906948b8b0a82ed609d2f",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({
    name: "",
    country: "",
    temp: null,
    temp_max: null,
    temp_min: null,
    desc: "",
    icon: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.length == 0) {
      setError("Input field cannot be empty!");
      return;
    }

    fetch(`${api.base}weather?q=${query}&&appid=${api.key}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod == "200") {
          setWeather({
            name: data.name,
            country: data.sys.country,
            temp: Math.floor(data.main.temp - 273.15),
            temp_max: Math.floor(data.main.temp_max - 273.15),
            temp_min: Math.floor(data.main.temp_min - 273.15),
            desc: data.weather[0].description,
            iconClass: getIconClass(data.weather[0].id),
          });
          setError("");
        } else {
          throw new Error("Invalid city name!");
        }
      })
      .catch(() => {
        setError("Invalid city name!");
      });
  };

  return (
    <div className="App">
      <h2 className="title">Weather App</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Search for a City"
          className={`search ${error.length > 0 ? "invalid" : ""}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input type="Submit" value="Get Weather" className="submit" readOnly />
      </form>

      {error.length > 0 ? (
        <p className="error">{error}</p>
      ) : (
        <Weather weather={weather} />
      )}
    </div>
  );
}

const getIconClass = (id) => {
  let wclass = "";
  switch (true) {
    case id >= 200 && id <= 232:
      wclass = "wi-thunderstorm";
      break;
    case id >= 300 && id <= 321:
      wclass = "wi-sprinkle";
      break;
    case id >= 500 && id <= 531:
      wclass = "wi-rain";
      break;
    case id >= 600 && id <= 622:
      wclass = "wi-snow";
      break;
    case id >= 701 && id <= 781:
      wclass = "wi-day-hail";
      break;
    case id === 800:
      wclass = "wi-day-sunny";
      break;
    case id > 800 && id <= 804:
      wclass = "wi-cloudy-windy";
      break;

    default:
      wclass = "wi-day-cloudy";
  }
  return wclass;
};

export default App;
