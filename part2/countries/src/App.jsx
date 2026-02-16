import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import DetailedCountry from "./components/DetailedCountry";

function App() {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");
  const [newWeather, setNewWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const searchResult = countries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(newSearch.toLowerCase().trim());
  });

  useEffect(() => {
    if (searchResult.length === 1) {
      const capital = searchResult[0].capital[0];
      const apiKey = import.meta.env.VITE_SOME_KEY;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`,
        )
        .then((response) => {
          setNewWeather(response.data);
        });
    }
  }, [searchResult]);

  if (!countries) {
    return null;
  }

  const handleInput = (event) => {
    setNewSearch(event.target.value);
  };

  console.log(newWeather);

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        find countries <input onChange={handleInput} />
      </form>
      <Countries
        searchResult={searchResult}
        newSearch={newSearch}
        setNewSearch={setNewSearch}
      />
      <DetailedCountry searchResult={searchResult} newWeather={newWeather} />
    </div>
  );
}

export default App;
