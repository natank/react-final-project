import React, { Component } from "react";
import { Link, Route, Switch } from 'react-router-dom';

import Login from './Login'
import CreateAccount from './CreateAccount'
import MainPage from './MainPage'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  async componentDidMount() {

  }


  render() {
    return (
      <div>
        <h1>Movies & Subscriptions Web Site</h1>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/createAccount" exact component={CreateAccount} />
          <Route path="/main" component={MainPage} />

        </Switch>
      </div>

    )
  }

}

export default App