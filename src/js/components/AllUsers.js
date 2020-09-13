import React from 'react'
import UserDetails from './UserDetails'
import AllUsersContext from '../Context/AllUsersContext';
import { useRouteMatch } from 'react-router-dom'


const AllUsers = () => {
  var match = useRouteMatch();

  var allUsersContext = {
    editUrl: `${match.url}/edit`
  }
  console.log(`allUsersContext=${allUsersContext}`)
  return (
    <AllUsersContext.Provider value={allUsersContext}>
      <UserDetails />
      </AllUsersContext.Provider>
  )
}

export default AllUsers