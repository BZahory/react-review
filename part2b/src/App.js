import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:{" "}
          <input
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />
        </div>
        <div>
          <button
            onClick={(event) => {
              event.preventDefault();
              persons.find(o => o.name === newName) == undefined
                ? setPersons((p) => [...p, { name: newName }])
                : alert(`${newName} is already added to phonebook`);
            }}
            type="submit"
          >
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
      {persons.map((x) => (
        <p key={x.name}>{x.name}</p>
      ))}
    </div>
  );
};

export default App;
