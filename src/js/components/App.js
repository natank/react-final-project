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
      pug`
        h1 Movies & Subscriptions Web Site
        Switch
          Route(path="/" exact component=${Login})
          Route(path="/createAccount" exact component=${CreateAccount})
          Route(path="/main" exact component=${MainPage})
      `
    )
  }

}

export default App