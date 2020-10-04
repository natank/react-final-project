import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { permissionsToString } from '../../Utils/utils'
import { MainContext } from '../../Context/main-context'
import { deleteUser } from '../../Model/user-model'
import { deleteUserPermissions } from '../../Model/user-permissions-model'
import { UsersManagementContext } from '../../Context/users-management-context'

function UserDetails({ user, userPermissions, match }) {
  var history = useHistory()
  var { usersManagementUrl } = useContext(UsersManagementContext)
  var { store } = useContext(MainContext)
  var [state, dispatch] = store;

  return (
    <div>
      <div>
        <label htmlFor="name">Name:</label>
        <span id="name">{`${user.firstName} ${user.lastName}`}</span>
      </div>
      <div>
        <label htmlFor="username">User Name:</label>
        <span id="username">{`${user.userName}`}</span>
      </div>
      <div>
        <label htmlFor="timeout">Session time out (Minutes):</label>
        <span id="username">{`${user.sessionTimeOut}`}</span>
      </div>
      <div>
        <label htmlFor="created">Created Date:</label>
        <span id="username">11/12/1998</span>
      </div>
      <div>
        <label htmlFor="permissions">Permissions: {permissionsToString(userPermissions)}</label>
        <span id="username"></span>
      </div>
      <ul>
        <li>
          <Link to={`${match.url}/edit/${user.id}`}>
            <input type="button" value="Edit" />
          </Link>
        </li>
      </ul>
      <input type="button" value="Delete" onClick={onDeleteUser} />
    </div>
  )

  async function onDeleteUser(event) {
    event.preventDefault();
    var userPermissions = state.usersPermissions.find(userPermissions => userPermissions.userId == user.id)
    if (!userPermissions) throw Error("Can't delete user, user permissions not found")
    var userPermissionsId = userPermissions.id;
    var users = await deleteUser(user.id);
    var usersPermissions = await deleteUserPermissions(userPermissionsId)

    dispatch(loadUsers(users, usersPermissions))

  }

  function loadUsers(users, usersPermissions) {
    return {
      type: "LOAD",
      payload: { ...state, users: [...users], usersPermissions: [...usersPermissions] }
    }
  }
}




export default UserDetails

