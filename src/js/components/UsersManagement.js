import React from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom'
import MainNav from './MainNav';
import AllUsers from './AllUsers';
import AddUser from './AddUser';

const UsersManagement = () => {
  const match = useRouteMatch();

  const usersRoutes = [
    {
      title: 'All Users',
      url: `${match.url}/users`
    },
    {
      title: 'Add User',
      url: `${match.url}/add`
    }
  ]
  return (
    <div>
      <Router>
        <Route path={`${match.url}`}>
          <div>
            <h1>Users</h1>
            <MainNav routes={usersRoutes} />
          </div>
        </Route>
        <Switch>
          <Route path={`${match.url}/users`}>
            <AllUsers />
          </Route>
          <Route path={`${match.url}/add`}>
            <AddUser />
          </Route>
        </Switch>
      </Router>
    </div>
  )

}

export default UsersManagement