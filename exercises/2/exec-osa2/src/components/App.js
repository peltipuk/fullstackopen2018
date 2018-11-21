import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  addEntry = (event) => {
    event.preventDefault();
    if (this.state.persons.find(person => person.name === this.state.newName) === undefined) {
      this.setState(
        {
          persons: [...this.state.persons, { name: this.state.newName, number: this.state.newNumber }],
          newName: '',
          newNumber: ''
        }
      )
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
        <div>
          rajaa näytettäviä
          <input value={this.state.filter} onChange={this.handleFilterChange} />
        </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addEntry}>
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handleNameChange} />
          </div>
          <div>
            numero: <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {personsToShow.map((person) => (
              <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
