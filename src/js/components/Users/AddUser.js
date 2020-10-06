import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { MainContext } from '../../Context/main-context'
import { UsersManagementContext } from '../../Context/users-management-context'
import { createUser } from '../../Model/user-model'
import { createUserPermissions } from '../../Model/user-permissions-model'

import UserForm from './UserForm'
export default function AddUser(userDetails, userPermissions) {
  var { store } = useContext(MainContext);
  var [state, dispatch] = store;
  var { users, usersPermissions } = state;

  var { usersManagementUrl } = useContext(UsersManagementContext)


  var history = useHistory()
  return (
    <div>
      <h2>Add New User</h2>
      <UserForm actionText="Create" onSubmit={onCreateUser} />
    </div>
  )

  async function onCreateUser(userDetails, userPermissions) {
    var { users, id } = await createUser(userDetails)
    var usersPermissions = await createUserPermissions(userPermissions, id)
    dispatch({
      type: "LOAD",
      payload: { ...state, users: [...users], usersPermissions: [...usersPermissions] }
    })

    history.push(usersManagementUrl)
  }
}
