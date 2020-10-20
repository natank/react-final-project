import { fromPairs } from 'lodash';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { MainContext } from '../../Context/main-context'
import { checkAccessToRoute } from '../../Utils/utils'

export default function MembersNav(props) {
  var { store, membersManagementUrl } = useContext(MainContext)
  var [state, dispatch] = store;
  var {authUser} = state;

  var routes = [{
    url: `${membersManagementUrl}`,
    title: "All Members"
  },
  {
    url: `${membersManagementUrl}/add`,
    title: "Add Members"
  }]

  return (
    <div>
      {routes.map((route, index) => {
        var isAuthorized = checkAccessToRoute(`${membersManagementUrl}/add`, authUser);
        return (
          isAuthorized ?
            <Link to={`${route.url}`} key={index}>
              <input type="button" value={`${route.title}`} />
            </Link> : null)
      })}
    </div>
  )
}
