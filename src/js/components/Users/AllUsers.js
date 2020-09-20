import React, { useContext } from 'react'
import UserDetails from './UserDetails'
import { MainContext } from '../../Context/main-context'
import UsersNav from './UsersNav';

function AllUsers({ match }) {

  var { MainReducer } = useContext(MainContext)

  var [mainState, mainDispatch] = MainReducer;

  var users = mainState.users;

  return (
    <div>
      <UsersNav match={match} />
      <ul>
        {
          users.map(function renderUser(user) {
            return <UserDetails key={user.id} user={user} match={match} />
          })
        }
      </ul>
    </div>
  )
}

export default AllUsers