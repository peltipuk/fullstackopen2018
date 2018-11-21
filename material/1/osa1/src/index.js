import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: new Array(props.anecdotes.length).fill(0),
    }
  }

  castVote() {
    const { selected, votes } = this.state
    const newState = {
      votes: [...votes]
    }
    newState.votes[selected] += 1
    this.setState(newState)
  }

  render() {
    const { selected, votes } = this.state;

    const maxVotesIndex = votes.reduce((acc, cur, idx, src) => {
      if(cur > src[acc]) {
        return idx;
      } else {
        return acc;
      }
    }, 0)

    return (
      <div>
        <div>
          {this.props.anecdotes[selected]}
        </div>
        <div>
          has {votes[selected]} votes
        </div>
        <button onClick={this.castVote.bind(this)}>
          vote
        </button>
        <button onClick={() => this.setState({ selected: Math.floor(Math.random() * anecdotes.length) })}>
          next anecdote
        </button>
        <h3>anecdote with most votes:</h3>
        <div>{this.props.anecdotes[maxVotesIndex]}</div>
        <div>has {votes[maxVotesIndex]} votes</div>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

/* Plus-minus-zero app
const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 1
    }
  }

  asetaArvoon = (arvo) => {
    return () => {
      this.setState({ counter: arvo })
    }
  }

  render() {
    return (
      <div>
        <Display counter={this.state.counter}/>
        <div>
          <Button
            handleClick={this.asetaArvoon(this.state.counter + 1)}
            text="Plus"
          />
          <Button
            handleClick={this.asetaArvoon(this.state.counter - 1)}
            text="Minus"
          />
          <Button
            handleClick={this.asetaArvoon(0)}
            text="Zero"
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
/*

/* Greetings application
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const nimi = 'Pekka'
  const ika = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Arto" age={26 + 10} />
      <Hello name={nimi} age={ika} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
*/