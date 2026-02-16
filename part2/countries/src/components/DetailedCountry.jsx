const DetailedCountry = ({ searchResult }) => {
  if (searchResult.length !== 1) return null;

  const country = searchResult[0];

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital ? country.capital.join(", ") : "N/A"}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
    </div>
  );
};

export default DetailedCountry;
