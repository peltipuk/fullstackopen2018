import React from 'react'

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

export default Kurssi