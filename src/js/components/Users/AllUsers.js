import React, { useContext } from 'react'
import UserDetails from './UserDetails'
import { MainContext } from '../../Context/main-context'
import UsersNav from './UsersNav';

function AllUsers({ match }) {

  var context = useContext(MainContext)
  var { usersStore, usersPermissionsStore } = context;

  var [usersState, usersDispatch] = usersStore;
  var { users } = usersState
  var [usersPermissionsState, usersPermissionsDispatch] = usersPermissionsStore;
  var { usersPermissions } = usersPermissionsState
  return (
    <div>
      <UsersNav match={match} />
      <ul>
        {
          users ? users.map(function renderUser(user) {
            let userPermissions = usersPermissions.find(permissions => permissions.userId == user.id)
            if (!userPermissions) return null
            return <UserDetails key={user.id} userPermissions={userPermissions.userPermissions} user={user} match={match} />
          }) : null
        }
      </ul>
    </div>
  )
}

export default AllUsers