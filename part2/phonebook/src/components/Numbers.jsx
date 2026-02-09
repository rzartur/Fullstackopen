const Numbers = ({ searchResult }) => {
  return (
    <>
      <h2>Numbers</h2>
      {searchResult.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default Numbers;
