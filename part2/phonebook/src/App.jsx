import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "111222333" },
  ]);
  const [newName, setNewName] = useState("Enter full name");
  const [newPhone, setNewPhone] = useState("Enter phone number");

  /*const exists =
    persons.filter((person) => person.name === newName.trim()).length > 0;
  */
  const exists = persons.some(
    (person) => person.name.toLowerCase() === newName.trim().toLowerCase(),
  );

  const addPerson = (event) => {
    event.preventDefault();
    //console.log("empty");

    if (!newName.trim() || newName.trim() === "Enter full name") {
      alert(`Name field cant be blank`);
      return;
    }

    if (exists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    if (newPhone.trim() === "Enter phone number") {
      alert(`Enter a phone number`);
      return;
    }

    const newPerson = {
      name: newName.trim(),
      phone: newPhone.trim(),
    };
    //setPersons(persons.concat(newPerson));
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewPhone("");
  };

  const handleChangeName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleChangePhone = (event) => {
    setNewPhone(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handleChangePhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.phone}
        </p>
      ))}
    </div>
  );
};

export default App;
