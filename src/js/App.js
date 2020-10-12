import React, { useState } from "react";
import { Route, Switch } from 'react-router-dom';

import Login from './components/Auth/Login'
import CreateAccount from './components/Auth/CreateAccount'
import Main from './Views/main-view'

function App(props) {
  var { user, setUser } = useState(null);

  return (
    <div>
      <h1>Movies & Subscriptions Web Site</h1>
      <Switch>
        <Route path="/" exact><Login setUser={setUser} /></Route>
        <Route path="/createAccount" exact><CreateAccount /></Route>
        <Route path="/main"><Main user={user} /></Route></Switch>
    </div>

  )
}


export default App