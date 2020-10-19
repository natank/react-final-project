import { fromPairs } from 'lodash';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UsersManagementContext } from '../../Context/users-management-context'
import { MainContext } from '../../Context/main-context'
import { checkAccessToRoute } from '../../Utils/utils'



export default function UsersNav(props) {
  var { store } = useContext(MainContext)
  var [state, dispatch] = store;
  var { authUser } = state
  var { usersManagementUrl } = useContext(UsersManagementContext)

  var routes = [{
    url: `${usersManagementUrl}`,
    title: "All Users"
  },
  {
    url: `${usersManagementUrl}/add`,
    title: "Add Users"
  }]
  return (
    <div>
      {routes.map((route, index) => {
        var isAuthorized = checkAccessToRoute(`${usersManagementUrl}/add`, authUser);
        return (
          isAuthorized ?
            <Link to={`${route.url}`} key={index}>
              <input type="button" value={`${route.title}`} />
            </Link> : null)
      })}
    </div>
  )
}
