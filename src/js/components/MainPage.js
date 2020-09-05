import React from 'react'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import Movies from './Movies';
import Subscriptions from './Subscriptions';
import UsersManagement from './UsersManagement';
import Login from './Login';

const MainPage = props => {
  let { path, url } = useRouteMatch()
  console.log(`path =${path} url=${url}`)
  return pug`
    div
      h1 Main Page
      ul
        li 
          Link(to=${`${url}/movies`}) Movies
        li 
          Link(to=${`${url}/subscriptions`}) Subscriptions
        li 
          Link(to=${`${url}/usersManagement`}) Users Management
        li 
          Link(to=${`/`}) Log Out

      Switch
        Route(path=${`${path}/movies`} element=${Movies()} exact)
        Route(exact path= '/') 
          Login
     
  `
}

export default MainPage