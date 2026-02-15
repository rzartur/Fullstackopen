import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import NewPerson from "./components/NewPerson";
import Numbers from "./components/Numbers";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialData) => {
      console.log("fulfilled", initialData);
      setPersons(initialData);
    });
  }, []);

  /*const exists =
    persons.filter((person) => person.name === newName.trim()).length > 0;
  */

  const addPerson = (event) => {
    event.preventDefault();

    //console.log("empty");

    if (!newName.trim()) {
      alert(`Name field cant be blank`);
      return;
    }

    const exists = persons.some(
      (person) => person.name.toLowerCase() === newName.trim().toLowerCase(),
    );

    if (exists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace old numebr with new one?`,
        )
      ) {
        const person = persons.find(
          (person) =>
            person.name.toLowerCase() === newName.toLowerCase().trim(),
        );
        console.log("person: ", person);

        const updatedPerson = { ...person, number: newNumber };
        console.log("updatedPerson: ", updatedPerson);

        personService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person,
              ),
            );
            setMessage({
              text: `Changed number to ${returnedPerson.number}`,
              type: "success",
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch(() => {
            setMessage({
              text: `Information of ${person.name} had already been removed from server`,
              type: "error",
            });
            setPersons(persons.filter((p) => p.id !== person.id));
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          });
        return;
      }
      return;
    }

    if (!newNumber.trim()) {
      alert(`Enter a phone number`);
      return;
    }

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
    };
    //setPersons(persons.concat(newPerson));
    personService.create(newPerson).then((returnedPerson) => {
      console.log("response: ", returnedPerson);
      setPersons([...persons, returnedPerson]);
      setNewName("");
      setNewNumber("");
      setMessage({ text: `Added ${returnedPerson.name}`, type: "success" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const handleChangeName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
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

  const handleRemovePerson = (id) => {
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          alert(`the person ${person.name} was already deleted`);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  console.log(message);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <SearchFilter handleSearch={handleSearch} />
      <NewPerson
        addPerson={addPerson}
        newName={newName}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newNumber={newNumber}
      />
      <Numbers
        searchResult={searchResult}
        handleRemovePerson={handleRemovePerson}
      />
    </div>
  );
};

export default App;
