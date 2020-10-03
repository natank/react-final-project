import React, { useState } from 'react'

export default function FindMovieForm({ changeFilter }) {
  var [filter, setFilter] = useState('')
  return (
    <form onSubmit={onSubmit}>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <input type="submit" value={`Find`} />
    </form>
  )

  function onSubmit(event) {
    event.preventDefault()
    changeFilter(filter)
  }
}