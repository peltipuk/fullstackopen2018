import React from 'react'
import personsService from '../services/persons'

const notificationDelay = 3000

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notificationMessage: 'Initial message'
    }
  }

  componentDidMount = () => {
    console.log('componentDidMount')
    personsService.getAll()
      .then(persons => {
        this.setState({ persons: persons })
      })
  }

  clearNotification = (delay) => {
    setTimeout(() => {
      this.setState({ notificationMessage: null })
    }, delay);
  }

  addEntry = (event) => {
    event.preventDefault();
    const personToUpdate = this.state.persons.find(person => person.name === this.state.newName)
    if (personToUpdate === undefined) {
      console.log('GETting all persons')
      personsService.create({ name: this.state.newName, number: this.state.newNumber })
        .then(newPerson => {
          console.log('Created new person: ', newPerson)
          this.setState(
            {
              persons: [...this.state.persons, newPerson],
              newName: '',
              newNumber: '',
              notificationMessage: `lisättiin ${newPerson.name}`
            }
          )
          this.clearNotification(notificationDelay)
        })
    } else {
      if (window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        personsService
          .update(personToUpdate.id, { ...personToUpdate, number: this.state.newNumber })
          .then(updatedPerson => {
            console.log('Updated resource:', updatedPerson)
            this.setState(
              {
                persons: [...this.state.persons.filter(person => person.id !== updatedPerson.id), updatedPerson],
                newName: '',
                newNumber: '',
                notificationMessage: `${updatedPerson.name}: numero muutettu`
              }
            )
            this.clearNotification(notificationDelay)
          })
      } else {
        console.log(`Cancelled updating of ${this.state.newName}`)
      }
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleRemoveClick = (id, name) => () => {
    if (window.confirm(`Delete '${name}'`)) {
      console.log(`Removing person with id ${id}`)
      personsService.remove(id).then(response => {
        console.log('Delete response status: ', response.status)
      })
      this.setState(
        {
          persons: this.state.persons.filter(person => person.id !== id),
          notificationMessage: `poistettiin ${name}`
        }
      )
      this.clearNotification(notificationDelay)
    } else {
      console.log(`Cancelled deleting of ${name}`)
    }
  }

  render() {
    const personsToShow = this.state.persons.filter(person => person.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0)

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.notificationMessage} />
        <FilterForm filter={this.state.filter} onChange={this.handleFilterChange} />
        <AddEntryForm
          onSubmit={this.addEntry}
          newName={this.state.newName}
          handleNameChange={this.handleNameChange}
          newNumber={this.state.newNumber}
          handleNumberChange={this.handleNumberChange}
        />
        <h2>Numerot</h2>
        <table>
          <tbody>
            {personsToShow.map((person) =>
              <PhoneCatalogEntry
                key={person.name}
                person={person}
                clickHandler={this.handleRemoveClick(person.id, person.name)} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='notification'>{message}</div>
  )
}

const AddEntryForm = ({ onSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <div>
    <h2>Lisää uusi</h2>
    <form onSubmit={onSubmit}>
      <div>
        nimi: <input
          value={newName}
          onChange={handleNameChange} />
      </div>
      <div>
        numero: <input
          value={newNumber}
          onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  </div>
)

const FilterForm = ({ filter, onChange }) => (
  <div>
    rajaa näytettäviä
    <input value={filter} onChange={onChange} />
  </div>
)

const PhoneCatalogEntry = ({ person, clickHandler }) => (
  <tr key={person.name}>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td>
      <button
        onClick={clickHandler}>
        poista
        </button>
    </td>
  </tr>
)


export default App
