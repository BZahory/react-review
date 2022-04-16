import { useState, useEffect } from "react";
import axios from 'axios';
import peopleService from './services/peopleService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  
  useEffect(() => {
    peopleService.getAll().then((response)=>{
      console.log(response.data);
      setPersons(response.data)});
  }, [])

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

  const handleAdd = (newName, newNumber) => {
    const newPerson = { name: newName, number: newNumber };
    setPersons((p) => [...p, newPerson ]);
    peopleService.create(newPerson);

  }

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
              ? handleAdd(newName, newNumber)
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
