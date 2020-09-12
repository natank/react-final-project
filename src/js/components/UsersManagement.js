import React from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom'
import MainNav from './MainNav';
import AllUsers from './AllUsers';
import AddUser from './AddUser';
import UserContext from '../Context/UserContext';
import EditUser from './EditUser'


const UsersManagement = () => {
  const match = useRouteMatch();

  const usersContext = {
    editUrl: `${match.url}/edit`
  }

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
                <UserContext.Provider value={usersContext}>
                  <AllUsers />
                </UserContext.Provider>
              </Route>
              <Route path={`${match.url}/add`}>
                <AddUser />
              </Route>
            </Switch>

          </Route>
        </Switch>


      </Router>
    </div>
  )

}

export default UsersManagement