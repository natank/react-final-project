import React, {useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UsersManagementContext } from '../Context/users-management-context';

const defaultRoutes = [
  {
    title: 'Movies',
    url: '/main/movies'
  },
  {
    title: 'Subscriptions',
    url: '/main/subscriptions'
  },
  {
    title: 'Users Management',
    url: '/main/usersManagement'
  },
  {
    title: 'Logout',
    url: '/'
  }
]



function setEditingUser(isEditing){
  var payload = isEditing
  usersManagementDispatch({
    type: "SET_EDITING_USER",
    payload
  })  
}

const MainNav = ({ routes = defaultRoutes }) => {
  var usersManagementContext = useContext(UsersManagementContext);
  console.log(usersManagementContext);
  var [usersManagementState,usersManagementDispatch] = usersManagementContext;
  console.log(UsersManagementContext);
  console.log(usersManagementState);

  const getRoute = (route, key) => {
    return (

      <li key={key}>
        <Link to={route.url}>{route.title}</Link>
      </li>
    )
  }
  return (
    <nav>
      <ul>
        {routes.map((elem, index) => getRoute(elem, index))}
        <li>
          <Link>
            <input type="button" value="Edit" onClick={() => { setEditingUser(false) }} />
          </Link>
        </li>
      </ul>
    </nav >
  )
}

export default MainNav;