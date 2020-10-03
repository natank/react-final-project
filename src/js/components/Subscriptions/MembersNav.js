import { fromPairs } from 'lodash';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import { MainContext } from '../../Context/main-context'

export default function MembersNav(props) {
  var { membersManagementUrl } = useContext(MainContext)
  return (
    <div>
      <Link to={`${membersManagementUrl}`}>
        <input type="button" value="All Members" />
      </Link>
      <Link to={`${membersManagementUrl}/add`}>
        <input type="button" value="Add Member" />
      </Link>
    </div>
  )
}
