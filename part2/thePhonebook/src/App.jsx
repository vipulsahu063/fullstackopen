import { useState, useEffect } from 'react'
import phoneService from './services/notes'

const Filter = ({search, handleSearchChange}) => {
  return (
    <div>
      filter shown with <input value={search} onChange={handleSearchChange} />
    </div>
  )
}

const PersonForm = ({addName, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addName}>
      <div>
       name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
       number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div><button type='submit'>add</button></div>
    </form>
  )
}

const Persons = ({personToShow, handleDelete}) => {
  return (
    <div>{personToShow.map(p => <div key={p.name}>{p.name} {p.number} <button onClick={() => handleDelete(p.id, p.name)}>delete</button></div>)}</div>
  )
}

const Notification = ({message, type}) => {
  return (
    <div className={type}>
      {message}
    </div>
  )
}

const App = () => {
  const [person, setPerson] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState({message: '', type: ''})



  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPhone => {
        setPerson(initialPhone)
      })
  }, [])


  
  const addName = (event) => {
  event.preventDefault();
  const createPhone = {
    name: newName,
    number: newNumber,
  };

  // Find if the person already exists
  const existingPerson = person.find(p => p.name === createPhone.name);

  if (existingPerson) {
    const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`);
    
    if (confirm) {
      // Update the existing person
      phoneService
        .update(existingPerson.id, createPhone)
        .then(updatedPerson => {
          // console.log('Updated person:', updatedPerson); // Debug log
          setPerson(person.map(p => p.id === updatedPerson.id ? updatedPerson : p));
          setNewName('');
          setNewNumber('');
          setMessage({message: `Updated ${createPhone.name} number`, type: 'success' })
          setTimeout(() => {
            setMessage({message: null, type: null})
          }, 5000)
        })
        .catch(error => {
          // console.error('Error updating contact:', error); // Error logging
          setMessage({message: `Information of ${createPhone.name} has already been removed from server`, type: 'error'})
          setTimeout(() => {
            setMessage({message: null, type: null})
          }, 5000)
          setPerson(person.filter(p => p.id !== existingPerson.id))
          setNewName('')
          setNewNumber('')
        });
    }
  } else {
    // Create a new person
    phoneService
      .create(createPhone)
      .then(initialPhone => {
        console.log('Created new contact:', initialPhone); // Debug log
        setPerson(person.concat(initialPhone));
        setNewName('');
        setNewNumber('');
        setMessage({message: `Added ${createPhone.name}`, type: 'success'})
        setTimeout(() => {
          setMessage({message: null, type: null})
        }, 5000)
      })
      .catch(error => {
        console.error(error.response.data.error); // Error logging
        setMessage({message: error.response.data.error, type: 'error'})
      });
  }
};


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleDelete = (id, name) => {

    const confirm = window.confirm(`Delete ${name} ?`)

    if(confirm) {
      phoneService
        .remove(id)
        .then(() => {
          setPerson(person.filter(p => p.id !== id))
        })
    }
  }

  const personToShow = search 
  ? person.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  : person 

  return (

      <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} type={message.type} />
      <Filter 
        search={search} 
        handleSearchChange={handleSearchChange} 
      />

      <h3>Add a new</h3>

      <PersonForm 
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons 
        personToShow={personToShow}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
