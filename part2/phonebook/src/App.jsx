import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("Enter full name");
  const [newNumber, setNewNumber] = useState("Enter phone number");
  const [newSearch, setNewSearch] = useState("");

  /*const exists =
    persons.filter((person) => person.name === newName.trim()).length > 0;
  */

  const addPerson = (event) => {
    event.preventDefault();

    //console.log("empty");

    if (!newName.trim() || newName.trim() === "Enter full name") {
      alert(`Name field cant be blank`);
      return;
    }

    const exists = persons.some(
      (person) => person.name.toLowerCase() === newName.trim().toLowerCase(),
    );

    if (exists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    if (newNumber.trim() === "Enter phone number") {
      alert(`Enter a phone number`);
      return;
    }

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
      id: persons.length + 1,
    };
    //setPersons(persons.concat(newPerson));
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewNumber("");
  };

  const handleChangeName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleChangePhone = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };

  console.log(
    persons.filter((person) => {
      return person.name.toLowerCase() === newSearch.trim().toLowerCase();
    }),
  );

  const searchResult = persons.filter((person) => {
    return person.name.toLowerCase().includes(newSearch.trim().toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleSearch} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangePhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {searchResult.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
