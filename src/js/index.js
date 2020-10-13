import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { MainContextProvider } from './Context/main-context';
import App from './App';

ReactDOM.render(
  <Router>
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </Router>
  , document.querySelector('#root'))

