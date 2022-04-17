/* Iida Peltonen 2022 */

import personService from '../services/persons'
import Notification from '../components/Notification'
import { useState } from 'react'
import '../css/App.css'

const Person = ({ person }) => {
  const [success, setSuccess] = useState('')

  const Poista = person => {
    let vastaus = false
    vastaus = window.confirm(`Poistetaanko henkilö ${person.name}?`)
    if (vastaus) {
      personService.remove(person.id)
      setSuccess(`${person.name} poistettu luettelosta`)
      setTimeout(() => {
        setSuccess(null);
        window.location.reload(false);
      }, 4000);
    }
  }

  return (
    <li key={person.id}>
      {' '}
      {person.name} {person.number}{' '}
      <button onClick={() => Poista(person)}>Poista</button>
      <Notification message={success} />
    </li>
  )
}

export default Person