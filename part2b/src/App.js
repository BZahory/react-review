import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  let displayed =
    filter != ""
      ? persons.filter((person) => person.name.includes(filter))
      : persons;

  const filterContacts = () => {
    return (
      <form>
        <h1>Phonebook</h1>
        filter shown with
        <input
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        />
      </form>
    );
  };

  const addContact = () => {
    return (
      <form>
        <h2>Phonebook</h2>
        <h1>add a new</h1>
        name:
        <input
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        number:
        <input
          onChange={(event) => {
            setNewNumber(event.target.value);
          }}
        />
        <button
          onClick={(event) => {
            event.preventDefault();
            persons.find((o) => o.name === newName) == undefined
              ? setPersons((p) => [...p, { name: newName, number: newNumber }])
              : alert(`${newName} is already added to phonebook`);
          }}
          type="submit"
        >
          add
        </button>
      </form>
    );
  };

  const displayContacts = () => {
    return (
      <div>
        <h2>Numbers</h2>
        {displayed.map((x) => (
          <p key={x.name}>
            {x.name} {x.number}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div>
      {filterContacts()}
      {addContact()}
      {displayContacts()}
    </div>
  );
};

export default App;
