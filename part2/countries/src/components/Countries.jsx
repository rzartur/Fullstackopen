const Countries = ({ searchResult, newSearch, setNewSearch }) => {
  if (!newSearch || searchResult.length === 1) return null;
  if (searchResult.length > 10)
    return <p>to many matches, specify another filter</p>;
  if (searchResult.length === 0) return <p>no matches found</p>;

  return searchResult.map((country) => (
    <p key={country.cca2}>
      {country.name.common}{" "}
      <button onClick={() => setNewSearch(country.name.common)}>show</button>
    </p>
  ));
};

export default Countries;
