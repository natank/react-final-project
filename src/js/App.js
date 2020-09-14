import React, { Component } from "react";
import { Link, Route, Switch } from 'react-router-dom';

import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import Main from './Views/main-view'

function App(props) {
  return (
    <div>
      <h1>Movies & Subscriptions Web Site</h1>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/createAccount" exact component={CreateAccount} />
        <Route path="/main" component={Main} />
      </Switch>
    </div>

  )
}


export default App