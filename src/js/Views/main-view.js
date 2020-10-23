import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';
import { MainContext } from '../Context/main-context'
import SubscriptionsManagementView from './subscriptions-management-view';
import UsersManagementView from './users-management-view'
import MoviesManagementView from './movies-management-view'
import MainNav from '../components/MainNav';
import Login from '../components/Auth/Login';
import PrivateRoute from '../components/Auth/PrivateRoute'
function MainView() {
  var { membersManagementUrl, moviesManagementUrl, usersManagementUrl } = useContext(MainContext)

  const match = useRouteMatch();
  const mainRoutes = [
    {
      title: 'Movies',
      url: moviesManagementUrl
    },
    {
      title: 'Subscriptions',
      url: membersManagementUrl
    },
    {
      title: 'Users Management',
      url: usersManagementUrl
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
        <Route path={moviesManagementUrl} >
          <PrivateRoute {...{ component: MoviesManagementView }} />
        </Route>
        <Route path={membersManagementUrl}>
          <PrivateRoute {...{ component: SubscriptionsManagementView }} />
        </Route>
        <Route path={usersManagementUrl}>
          <PrivateRoute {...{ component: UsersManagementView }}></PrivateRoute>
        </Route>
      </Switch>
    </Router>
  )

}

export default function Main(props) {
  return (
    <MainView />
  )
}