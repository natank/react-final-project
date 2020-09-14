import React, { useContext } from 'react'
import UserDetails from './UserDetails'

import { UMC } from '../Context/users-mangagement-context'
import { ccc } from '../Context/users-mangagement-context'

const AllUsers = () => {
  console.log(ccc)
  var [state, dispatch] = useContext(UMC);
  console.log(state)

  return (
    <UserDetails />
  )
}

export default AllUsers