const DetailedCountry = ({ searchResult, newWeather }) => {
  if (searchResult.length !== 1 || !newWeather) return null;

  const country = searchResult[0];
  const capital = country.capital ? country.capital.join(", ") : "N/A";
  const temp = newWeather.main.temp;
  const wind = newWeather.wind.speed;
  const icon = newWeather.weather[0].icon;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
      <h2>Weather in {capital}</h2>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}></img>
      <p>Temperature {temp} Celcius</p>
      <p>Wind {wind} m/s</p>
    </div>
  );
};

export default DetailedCountry;
