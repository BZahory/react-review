import { useState, useEffect } from "react";
import axios from "axios";
import peopleService from "./services/peopleService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    peopleService.getAll().then((response) => {
      console.log(response.data);
      setPersons(response.data);
    });
  }, []);

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setAlert("");
    }, 3000)

    return () => {
      clearTimeout(timeId);
    }
  }, [alert]);


  let displayed =
    filter != ""
      ? persons.filter((person) => person.name.includes(filter))
      : persons;

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="error">{message}</div>;
  };

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
    peopleService.create(newPerson);
    peopleService.getAll().then((response) => {
      console.log(response.data);
      setPersons(response.data);
    });
  };

  const handleSameAdd = (name, newNumber) => {
    if (window.confirm("Are you sure you want to replace " + name)) {
      const target = persons.find((o) => o.name === name);
      peopleService.update(target.id, { ...target, number: newNumber }).then(window.location.reload()).catch(setAlert("Already deleted " + name));
    }
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
              ? handleAdd(newName, newNumber)
              : handleSameAdd(newName, newNumber);
          }}
          type="submit"
        >
          add
        </button>
      </form>
    );
  };

  const deleteContact = async (targetName) => {
    if (window.confirm("Are you sure you want to delete " + targetName)) {
      await peopleService.deleteById(
        persons.find((o) => o.name === targetName).id
      );
      peopleService.getAll().then((response) => {
        console.log(response.data);
        setPersons(response.data);
      setAlert("deleted " + targetName);
      });
    }
  };

  const displayContacts = () => {
    return (
      <div>
        {alert !== "" && <Notification className="error" message={alert} />}
        <h2>Numbers</h2>
        {displayed.map((x) => (
          <div>
            <p key={x.name}>
              {x.name} {x.number}
            </p>
            <button onClick={() => deleteContact(x.name)}>delete</button>
          </div>
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
