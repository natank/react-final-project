import React from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';
import Movies from '../components/Movies';
import Subscriptions from '../components/Subscriptions';
import UsersManagement from './users-management-view'
import MainNav from '../components/MainNav';
import Login from '../components/Login';
import { MainContextProvider } from '../Context/main-context';
export default function Main() {
  const match = useRouteMatch();
  const mainRoutes = [
    {
      title: 'Movies',
      url: `${match.url}/movies`
    },
    {
      title: 'Subscriptions',
      url: `${match.url}/subscriptions`
    },
    {
      title: 'Users Management',
      url: `${match.url}/usersManagement`
    },
    {
      title: 'Logout',
      url: '/'
    }
  ]

  return (
    <MainContextProvider>
      <Router>
        <Route path={`${match.url}`}>
          <div>
            <h1>Main Page</h1>
            <MainNav routes={mainRoutes} />
          </div>
        </Route>

        <Switch>
          <Route path={`${match.url}/movies`}>
            <Movies />
          </Route>
          <Route path={`${match.url}/subscriptions`}>
            <Subscriptions />
          </Route>
          <Route path={`${match.url}/usersManagement`}>
            <UsersManagement />
          </Route>
          <Route path={`/`} exact>
            <Login />
          </Route>
        </Switch>
      </Router>
    </MainContextProvider>
  )

}