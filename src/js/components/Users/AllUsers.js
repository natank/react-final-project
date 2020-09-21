import React, { useContext } from 'react'
import UserDetails from './UserDetails'
import { MainContext } from '../../Context/main-context'
import UsersNav from './UsersNav';

function AllUsers({ match }) {

  var context = useContext(MainContext)
  var { usersReducer, permissionsReducer } = context;

  var [users, usersDispatch] = usersReducer;
  var [permissions, permissionsDispatch] = permissionsReducer;

  return (
    <div>
      <UsersNav match={match} />
      <ul>
        {
          users.map(function renderUser(user) {
            let userPermissions = permissions.find(permission => permission.userId == user.id)
            if (!userPermissions) throw (new Error("User permissions not found"))
            return <UserDetails key={user.id} permissions={userPermissions.permissions} user={user} match={match} />
          })
        }
      </ul>
    </div>
  )
}

export default AllUsers