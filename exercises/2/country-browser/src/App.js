import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      allCountries: [],
      filter: ''
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('GET completed')
        this.setState({ allCountries: response.data })
      })
  }

  handleFilterChange = (event) => {
    console.log('Setting filter state to', event.target.value)
    this.setState({ filter: event.target.value })
  }

  renderCountries() {
    const countries = this.state.allCountries.filter(country => country.name.toLowerCase().indexOf(this.state.filter) >= 0)
    console.log('filter produced', countries.length, 'matches')
    if(countries.length === 0 || this.state.filter === '') {
      return null
    } else if(countries.length === 1) {
      return <Country country={countries[0]} />
    } else if(countries.length <= 10) {
      return countries.map(country => <div key={country.name}>{country.name}</div>)
    } else {
      return 'too many matches, specify another filter'
    }
  }

  render() {
    console.log('rendering')
    return (
      <div>
        <div>
          <div>find countries:
        <input value={this.state.filter} onChange={this.handleFilterChange} />
          </div>
          <div>
            {this.renderCountries()}
          </div>
        </div>
      </div>
    )
  }
}

const Country = ( {country} ) => (
  <div>
    <h2>{country.name} {country.nativeName}</h2>
    <div>capital: {country.capital}</div>
    <div>population: {country.population}</div>
    <img src={country.flag} alt={'Flag of ' + country.name} width='200' height='120'/>
  </div>
)

export default App;
