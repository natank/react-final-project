import React, { useState } from "react";
import { Route, Switch } from 'react-router-dom';

import Login from './components/Auth/Login'
import CreateAccount from './components/Auth/CreateAccount'
import Main from './Views/main-view'
import PrivateRoute from './components/Auth/PrivateRoute'
function App(props) {
  return (
    <div>
      <h1>Movies & Subscriptions Web Site</h1>

      <Switch>
        <Route path="/" exact><Login /></Route>
        <Route path="/createAccount" exact><CreateAccount /></Route>
        <Route path="/main">
          <PrivateRoute {...{ component: Main }}></PrivateRoute>

        </Route>
      </Switch>
    </div>

  )
}


export default App