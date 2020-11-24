import React, { useState } from "react";
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './Views/Theme';

import Login from './components/Auth/Login'
import CreateAccount from './components/Auth/CreateAccount'
import Main from './Views/main-view'
import PrivateRoute from './components/Auth/PrivateRoute'
function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/login" exact><Login /></Route>
        <Route path="/createAccount" exact><CreateAccount /></Route>
        <Route path="/">
          <PrivateRoute {...{ component: Main }}></PrivateRoute>
        </Route>
      </Switch>
    </ThemeProvider>
  )
}


export default App