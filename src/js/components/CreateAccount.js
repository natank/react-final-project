import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const CreateAccount = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return pug`

    h2 Create an Account
    form(onSubmit= e =>{
      e.preventDefault();
      props.history.push('/')
    })
      .form__field
        label(for="username") User name:
        input#username(type="text" 
          value=${username}, 
          onChange=${e => setUsername(e.target.value)})
      .form__field
        label(for="password") password:
        input#password(type="password" 
          value=${password}, 
          onChange=${e => setPassword(e.target.value)})
      input(type="submit" value="Create")

  `
}

export default CreateAccount