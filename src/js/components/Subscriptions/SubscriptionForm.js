import React from 'react'

export default function SubscriptionForm({ memberId }) {
  return (
    <form>
      <h4>Add a new movie</h4>
      <select name="movies">
        <option value="1">One</option>
        <option value="2">Two</option>
      </select>
      <input type="date" name="watch" />
    </form>
  )
}