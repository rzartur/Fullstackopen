const Numbers = ({ searchResult, handleRemovePerson }) => {
  return (
    <>
      <h2>Numbers</h2>
      {searchResult.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleRemovePerson(person.id)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Numbers;
