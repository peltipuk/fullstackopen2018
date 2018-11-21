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
  return <p>yhteensä {props.osat.reduce((sum, cur) => sum + cur.tehtavia, 0)} tehtävää</p>
}

const Kurssi = (props) => {
  return (
    <div>
      <Otsikko kurssi={props.kurssi.nimi} />
      <Sisalto osat={props.kurssi.osat} />
      <Yhteensa osat={props.kurssi.osat} />
    </div>
  )
}

const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Opetusohjelma</h1>
      {kurssit.map(kurssi => <Kurssi kurssi={kurssi} />)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
