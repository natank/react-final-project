import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { permissionsToString } from '../../Utils/utils'
import { MainContext } from '../../Context/main-context'
import { deleteUser } from '../../Model/user-model'
import { deleteUserPermissions } from '../../Model/user-permissions-model'
import { UsersManagementContext } from '../../Context/users-management-context'
import { deleteUserLogin } from '../../Model/user-login-model';
import { checkAccessToRoute } from '../../Utils/utils'

function UserDetails({ user, userPermissions, match }) {


  var { store } = useContext(MainContext)
  var [state, dispatch] = store;
  var { authUser } = state
  if (user && userPermissions) {
    var editUserRoute = `${match.url}/edit/${user.id}`
    var deleteUserRoute = `${match.url}/delete/${user.id}`
    var isUserAllowedToDelete = checkAccessToRoute(deleteUserRoute, authUser)
    var isUserAllowedToEdit = checkAccessToRoute(editUserRoute, authUser)
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
          <span id="username">{`${formatDate(user.createdDate)}`}</span>
        </div>
        <div>
          <label htmlFor="permissions">Permissions: {permissionsToString(userPermissions)}</label>
          <span id="username"></span>
        </div>
        <ul>
          {isUserAllowedToEdit
            ? <li>
              <Link to={editUserRoute}>
                <input type="button" value="Edit" />
              </Link>
            </li>
            : null
          }
        </ul>
        {isUserAllowedToDelete
          ? <input type="button" value="Delete" onClick={onDeleteUser} />
          : null
        }
      </div>)
  }
  else return null


  function formatDate(timestampArg){
    var timestamp = timestampArg || Date.now();
    var dateObj = new Date(timestamp);
    var date = dateObj.toLocaleDateString().split(',')[0].replaceAll('.','/')
    
    return date
  }

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

