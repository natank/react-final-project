import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { permissionsToString } from '../../Utils/utils'
import { MainContext } from '../../Context/main-context'
import { deleteUser } from '../../Model/user-model'
import { deleteUserPermissions } from '../../Model/user-permissions-model'
import { UsersManagementContext } from '../../Context/users-management-context'
import { deleteUserLogin } from '../../Model/user-login-model';

function UserDetails({ user, userPermissions, match }) {


  var { store } = useContext(MainContext)
  var [state, dispatch] = store;
  if (user && userPermissions)
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
      </div>)
  else return null


  async function onDeleteUser(event) {
    var userId = user.id
    event.preventDefault();
    var userPermissions = state.usersPermissions.find(userPermissions => userPermissions.userId == userId)
    if (!userPermissions) throw Error("Can't delete user, user permissions not found")
    var userPermissionsId = userPermissions.id;
    try {
      await deleteUser(userId);

      await deleteUserPermissions(userPermissionsId);
    } catch (err) {
      console.log(err)
    }

    dispatch({
      type: "REMOVE_USER",
      payload: {
        userId, userPermissionsId
      }
    })

  }

}




export default UserDetails

