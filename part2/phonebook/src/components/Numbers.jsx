const Numbers = ({ searchResult, handleRemovePerson }) => {
  return (
    <>
      <h2>Numbers</h2>
      {searchResult.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleRemovePerson(person.id)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Numbers;
