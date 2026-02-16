import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import DetailedCountry from "./components/DetailedCountry";

function App() {
  const [countries, setCountries] = useState(null);
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  if (!countries) {
    return null;
  }

  const handleInput = (event) => {
    setNewSearch(event.target.value);
  };

  const searchResult = countries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(newSearch.toLowerCase().trim());
  });

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
      <DetailedCountry searchResult={searchResult} />
    </div>
  );
}

export default App;
