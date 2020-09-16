import React, { useContext } from 'react'
import UserDetails from './UserDetails'

import {MainContext} from '../Context/main-context'

const AllUsers = () => {
  
  var [state] = useContext(MainContext)

  var users = state.users;

  console.log(users)

  return (
    <ul>
      {users.map(function renderUser(user){
        return <UserDetails key={user.id} user={user}/>

      })}

    </ul>
  )
}

export default AllUsers