/* Iida Peltonen 2022 */

import React, { useState } from 'react'
import Person from './Person'

const Filter = ({ persons }) => {
  const [wordEntered, setWordEntered] = useState('')
  const [filteredData, setFilteredData] = useState([persons])

  function handleFilter (e) {
    const hakusana = e.target.value
    setWordEntered(hakusana)
    const newFilter = persons.filter(value => {
      return value.name.toLowerCase().includes(hakusana.toLowerCase())
    })
    setFilteredData(newFilter)
  }

  return (
    <div>
      Hae kaveria <input onChange={handleFilter} value={wordEntered} />
      {wordEntered.length !== 0 && (
        <div>
          <ul>
            {filteredData.map(person => (
              <Person key={person.id} person={person} />
            ))}
          </ul>
        </div>
      )}
      {wordEntered.length === 0 && (
        <div>
          <ul>
            {persons.map(person => (
              <Person key={person.id} person={person} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Filter