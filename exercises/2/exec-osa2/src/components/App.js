import React from 'react'
import personsService from '../services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount = () => {
    console.log('componentDidMount')
    personsService.getAll()
      .then(persons => {
        this.setState({ persons: persons })
      })
  }

  addEntry = (event) => {
    event.preventDefault();
    if (this.state.persons.find(person => person.name === this.state.newName) === undefined) {
      console.log('GETting all persons')
      personsService.create({ name: this.state.newName, number: this.state.newNumber })
        .then(newPerson => {
          console.log('Created new person: ', newPerson)
          this.setState(
            {
              persons: [...this.state.persons, newPerson],
              newName: '',
              newNumber: ''

            })
        })
    } else {
      alert('"' + this.state.newName + '" on jo luettelossa')
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

  render() {
    const personsToShow = this.state.persons.filter(person => person.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0)

    return (
      <div>
        <h2>Puhelinluettelo</h2>
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
            {personsToShow.map((person) => <PhoneCatalogEntry key={person.name} person={person} />)}
          </tbody>
        </table>
      </div>
    )
  }
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

const PhoneCatalogEntry = ({ person }) => (
  <tr key={person.name}>
    <td>{person.name}</td>
    <td>{person.number}</td>
  </tr>
)


export default App
