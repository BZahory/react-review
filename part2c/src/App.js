import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState([]);

  useEffect( () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
    const coords = countries.length > 0 ? countries[0].latlng : ["0","0"];
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          coords[0] +
          "&lon=" +
          coords[1] +
          "&appid=" +
          api_key
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  let displayed =
    filter != ""
      ? countries.filter((countries) =>
          countries.name.common.toLowerCase().includes(filter.toLowerCase())
        )
      : countries;

  const filterCountries = () => {
    return (
      <form>
        <h1>Phonebook</h1>
        filter shown with
        <input
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        />
      </form>
    );
  };

  const displayCountries = () => {
    return (
      <div>
        <h2>Numbers</h2>
        {displayed.length < 10 && displayed.length > 1 ? (
          displayed.map((x) => {
            return <div key={x.name.common}>
              <p>{x.name.common}</p>
              <button
                onClick={() => {
                  setFilter(x.name.common);
                }}
              >
                show
              </button>
              </div>
          })
        ) : (
          <div>
            {displayed.length > 1 ? (
              "Too many matches, specify another filter"
            ) : displayed.length != 1 ? (
              "No countries found"
            ) : (
              <div>
                <h1>{displayed[0].name.common}</h1>
                <p>capital {displayed[0].capital}</p>
                <p>area {displayed[0].area}</p>
                <h1>languages</h1>
                <ul>
                  {Object.values(displayed[0].languages).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <img src={displayed[0].flags.png} />
                {displayWeather()}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const displayWeather = () => {
    return <div>
      <p>temperature {weather.main.temp} Celcius</p>,
      <img
        src={
          "http://openweathermap.org/img/wn/" +
          weather.weather[0].icon +
          "@2x.png"
        }
      />,
      <p>wind {weather.wind.speed} m/s</p>,
    </div>
  };

  return (
    <div>
      {filterCountries()}
      {displayCountries()}
    </div>
  );
};

export default App;
