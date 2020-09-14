import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom'
import { UsersManagementContext, UsersManagementContextProvider } from '../Context/users-mangagement-context';

import MainNav from '../components/MainNav';
import AllUsers from '../components/AllUsers';
import AddUser from '../components/AddUser';
import EditUser from '../components/EditUser'

export default function UsersManagement() {
  console.log(UsersManagementContext)
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
    <UsersManagementContextProvider>
      <h1>Users</h1>
      <Router>
        <Switch>
          <Route path={`${match.url}/edit`}>
            <EditUser />
          </Route>
          <Route>
            <Route path={`${match.url}`}>
              <div>
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
          </Route>
        </Switch>
      </Router>

    </UsersManagementContextProvider>
  )
}
