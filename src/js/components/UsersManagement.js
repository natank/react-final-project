import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom'
import MainNav from './MainNav';
import AllUsers from './AllUsers';
import AddUser from './AddUser';

import EditUser from './EditUser'
import UsersManagementContext from '../Context/UsersMangagementContext';

var UsersManagement = () => {
  const match = useRouteMatch();
  var [editedUser, setEditedUser] = useState(0)
  
  var usersMAnagementContext = {
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
    <UsersManagementContext.provider value ={usersMAnagementContext}>
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
      </UsersManagementContext.provider>
      </div>
  )

}

export default UsersManagement