import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => (
  <h1>{props.kurssi}</h1>
)

const Osa = (props) => (
  <p>{props.nimi} {props.tehtavia}</p>
)

const Sisalto = (props) => (
  <div>
    {
      props.osat.map(osa => (
        <Osa nimi={osa.nimi} tehtavia={osa.tehtavia} />
      ))
    }
  </div>
)

const Yhteensa = (props) => {
    let sum = 0
    props.osat.forEach(osa => {
      sum += osa.tehtavia
    })
    return <p>yhteensä {sum} tehtävää</p>
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osat={[osa1, osa2, osa3]} />
      <Yhteensa osat={[osa1, osa2, osa3]} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)