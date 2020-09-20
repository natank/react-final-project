import React from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';
import Subscriptions from '../components/Subscriptions';
import UsersManagementView from './users-management-view'
import MoviesManagementView from './movies-management-view'
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
          <Route path={`${match.url}/movies`} component={MoviesManagementView} />
          <Route path={`${match.url}/subscriptions`} component={Subscriptions} />
          <Route path={`${match.url}/usersManagement`} component={UsersManagementView} />
          <Route path={`/`} exact component={Login} />
        </Switch>
      </Router>
    </MainContextProvider>
  )

}