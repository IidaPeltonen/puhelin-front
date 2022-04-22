/* Iida Peltonen 2022 */

import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) //kaikki tyypit
  const [newPerson, setNewPerson] = useState('') //nimet
  const [newNumber, setNewNumber] = useState('') //numerot
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  //uuden lisäys
  const LisaaUusi = e => {
    e.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber
    }
    let id
    let samaNimi = false

    //käydään taulukon nimet läpi ja verrataan
    persons.forEach((item, index) => {
      //jos sama nimi löytyy
      if (item.name.toLowerCase() === newPerson.toLowerCase()) {
        samaNimi = true
        // vaihdetaan "uuden" idksi vanhan id
        id = item.id
      }
    })

    if (samaNimi) {
      let vastaus = window.confirm(
        `${newPerson} löytyy jo luettelosta, päivitetäänkö numero?`
      )
      if (!vastaus) {
        setNewPerson('')
        setNewNumber('')
      } else {
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewPerson('')
            setNewNumber('')
            setSuccess(`${returnedPerson.name} n numero päivitetty!`)
            setTimeout(() => {
              setSuccess(null)
              window.location.reload(false)
            }, 5000)
          })
          .catch(error => {
            console.log(error.response.data)
            setError(error.response.data.error)
            setTimeout(() => {
              setError(null)
              window.location.reload(false)
            }, 5000)
          })
      }
    } 
    //jos nimi on oikeasti uusi
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewPerson('')
        setNewNumber('')
        setSuccess(newPerson + ' lisätty luetteloon')
        setTimeout(() => {
          setSuccess(null)
          window.location.reload(false)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data)
        setError(error.response.data.error)
        setTimeout(() => {
          setError(null)
          window.location.reload(false)
        }, 5000)
      })
    }
  }

  const handlePersonChange = e => {
    setNewPerson(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Filter persons={persons} />
      <h2>Tallenna uusi</h2>
      <form onSubmit={LisaaUusi}>
        <Notification message={success} message2={error} />
        Nimi: <input value={newPerson} onChange={handlePersonChange} />
        <br />
        Numero: <input value={newNumber} onChange={handleNumberChange} />
        <br />
        <button type='submit'>Tallenna</button>
      </form>
    </div>
  )
}

export default App
