import React from 'react'
import { Route } from 'react-router-dom'
import { UsersManagementContextProvider } from '../Context/users-management-context';

import AllUsers from '../components/Users/AllUsers';
import AddUser from '../components/Users/AddUser';
import EditUser from '../components/Users/EditUser'


export default function UsersManagement({ match }) {

  return (
    <UsersManagementContextProvider match={match}>

      <h1>Users</h1>

      <Route path={`${match.url}/add`} component={AddUser} />
      <Route exact path={`${match.url}`} component={AllUsers} />
      <Route path={`${match.url}/edit/:id`} component={EditUser} />


    </UsersManagementContextProvider>
  )
}
