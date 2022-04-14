import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  let displayed = filter != "" ? persons.filter(person => person.name.includes(filter)) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
        <h1>Phonebook</h1>
        filter shown with
        <input
            onChange={(event) => {
              setFilter(event.target.value);
            }}
          />
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
        </div>
        <div>
          <button
            onClick={(event) => {
              event.preventDefault();
              persons.find(o => o.name === newName) == undefined
                ? setPersons((p) => [...p, { name: newName, number: newNumber }])
                : alert(`${newName} is already added to phonebook`);
            }}
            type="submit"
          >
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {displayed.map((x) => (
    <p key={x.name}>{x.name} {x.number}</p>))}
    </div>
  );
};

export default App;
