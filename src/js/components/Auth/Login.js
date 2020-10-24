import React, { useEffect, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../../Model/Auth-Model'
import { MainContext } from '../../Context/main-context';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, TextField, Typography, Button } from '@material-ui/core';

export default function Login(props) {

  const classes = useStyles();
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography>Sign in</Typography>
        <form classNAme={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autooComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <p>New User ? :<Link to="/createAccount">Create Account</Link></p>
        </form>
      </div>
    </Container>
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


function useStyles() {
  var s = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }))
  return s()
}

