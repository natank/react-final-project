import { fromPairs } from 'lodash';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import { UsersManagementContext } from '../../Context/users-management-context'

export default function UsersNav(props) {
  var { usersManagementUrl } = useContext(UsersManagementContext)
  return (
    <div>
      <Link to={`${usersManagementUrl}`}>
        <input type="button" value="All Users" />
      </Link>
      <Link to={`${usersManagementUrl}/add`}>
        <input type="button" value="Add Users" />
      </Link>
    </div>
  )
}
