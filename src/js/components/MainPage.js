import React from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom';
import Movies from './Movies';
import Subscriptions from './Subscriptions';
import UsersManagement from './UsersManagement';
import MainNav from './MainNav';
import Login from './Login';
const MainPage = () => {
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
    <div>
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
    </div >
  )

}

export default MainPage