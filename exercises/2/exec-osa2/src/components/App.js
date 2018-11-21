import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addEntry = (event) => {
    event.preventDefault();
    this.setState(
      {
        persons: [...this.state.persons, { name: this.state.newName }],
        newName: ''
      }
    )
  }

  handleInputChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addEntry}>
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handleInputChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons.map((person) => <div key={person.name}>{person.name}</div>)}
      </div>
    )
  }
}

export default App
