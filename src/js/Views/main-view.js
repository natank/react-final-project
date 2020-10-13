import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';
import SubscriptionsManagementView from './subscriptions-management-view';
import UsersManagementView from './users-management-view'
import MoviesManagementView from './movies-management-view'
import MainNav from '../components/MainNav';
import Login from '../components/Auth/Login';

function MainView() {
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
    <Router>
      <Route path={`${match.url}`}>
        <div>
          <h1>Main Page</h1>
          <MainNav routes={mainRoutes} />
        </div>
      </Route>

      <Switch>
        <Route path={`${match.url}/movies`} component={MoviesManagementView} />
        <Route path={`${match.url}/subscriptions`} component={SubscriptionsManagementView} />
        <Route path={`${match.url}/usersManagement`} component={UsersManagementView} />
        <Route path={`/`} exact component={Login} />
      </Switch>
    </Router>
  )

}

export default function Main(props) {
  return (
    <MainView />
  )
}