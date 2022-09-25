import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personsService from './services/persons';

const Filter = ({ filterName, setFilterName }) => (
  <p>filter shown with <input value={filterName} onChange={(e) => setFilterName(e.target.value)} /></p>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personsService.getAll()
    .then((response) => {
      setPersons(response);
    })
  }, []);

  const filtered_persons = filterName === ''
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(filterName.toLowerCase()));

  const handleAddName = (event) => {
    event.preventDefault()
    if (newName === '' || newPhone === '') {
      alert('Both name and phone need to be provided');
      return
    }
    const newPerson = {
      name: newName,
      number: newPhone,
    }
    const oldPerson = persons.find((person) => {
      return newPerson.name === person.name;
    });
    if (oldPerson) {
      if(window.confirm(`${newName} is already added in the phonebook, replace the old number with the new one?`)) {
        personsService.update({...oldPerson, number: newPhone})
        .then(updatedPerson => {
          setPersons(persons.map(p => p.id !== oldPerson.id ? p : updatedPerson))
          setNotificationMessage(`Updated ${updatedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000)
        })
          .catch(() => {
            setNotificationMessage(`Information of ${oldPerson.name} has already been deleted from the server`);
            setPersons(persons.filter(person => person.name !== oldPerson.name))
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
        })
      }
    } else {
      personsService
      .create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson));
        setNotificationMessage(`Added ${newPerson.name}`)
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);

      })
    }
    setNewName('');
    setNewPhone('');
  }

  const deleteContact = (name, id) => {
      if(window.confirm(`Delete ${name}?`)) {
      personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNotificationMessage(`Deleted ${name}`)
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      })
      .catch(() => {
        setNotificationMessage(`Information of ${name} has already been deleted from the server`);
        setPersons(persons.filter(person => person.id !== id))
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
        handleAddName={handleAddName}
      />
      <h3>Numbers</h3>
      <Persons contacts={filtered_persons} deleteContact={deleteContact}/>
    </div>
  )
}

export default App