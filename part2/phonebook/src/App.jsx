import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("Enter full name");

  /*const exists =
    persons.filter((person) => person.name === newName.trim()).length > 0;
  */
  const exists = persons.some(
    (person) => person.name.toLowerCase() === newName.trim().toLowerCase(),
  );

  const addName = (event) => {
    event.preventDefault();
    console.log("empty");

    if (!newName.trim() || newName === "Enter full name") {
      alert(`Field cant be blank`);
      return;
    }

    if (exists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName.trim(),
    };
    //setPersons(persons.concat(newPerson));
    setPersons([...persons, newPerson]);
    setNewName("");
  };

  const handleChangeName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
        {persons.map((person) => (
          <p key={person.name}>{person.name}</p>
        ))}
      </>
    </div>
  );
};

export default App;
