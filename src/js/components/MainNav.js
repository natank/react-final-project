import React from 'react'
import { Link, useHistory } from 'react-router-dom'
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


const MainNav = ({ routes = defaultRoutes }) => {
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
      </ul>
    </nav >
  )
}

export default MainNav;