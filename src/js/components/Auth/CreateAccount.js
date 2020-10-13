import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../API/firebase'
import { createAccount } from "../../Model/Auth-Model"

const CreateAccount = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  var history = useHistory();
  return (
    <div>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form__field">
          <label htmlFor="username">User name:</label>
          <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="form__field">
          <label htmlFor="password">password:</label>
          <input id="password" type="password" value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <p>{errorMessage}</p>
        <input type="submit" value="Create" />
      </form>
    </div>)
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createAccount({ username, password })
      history.push('/')
    } catch (err) {
      setErrorMessage(err)
    }
  }
}

export default CreateAccount