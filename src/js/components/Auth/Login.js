import React, { useEffect, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../../Model/Auth-Model'
import { MainContext } from '../../Context/main-context'
const Login = props => {
  const history = useHistory();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState({ redirect: false, user: null })
  var { store } = useContext(MainContext)
  var [state, dispatch] = store;
  useEffect(() => {
    if (user.redirect)
      dispatch({
        type: "LOGIN_USER",
        payload: user.user
      })

  }, [user]
  )

  useEffect(() => {
    user.redirect && history.push('/main')
  })



  return (
    <div>
      <h2>Log in Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="form__field">
          <label htmlFor="username"> User name:</label>
          <input id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form__field">
          <label htmlFor="password">password:</label>
          <input id="password" type="password" value={password}
            onChange={e => setPassword(e.target.value)} autoComplete="on" />
          <p>{errorMessage}</p>
        </div>
        <input type="submit" value="Login" />
        <p>New User ? :</p>
        <Link to="/createAccount">Create Account</Link>
      </form>
    </div>
  )
  async function handleSubmit(e) {

    e.preventDefault();
    try {
      var user = await loginUser({ username, password })

      setUser({
        redirect: true,
        user
      })
    } catch (err) {
      setErrorMessage(err)
    }
  }


}


export default Login