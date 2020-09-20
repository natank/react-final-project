import React from 'react'
import { Link } from 'react-router-dom'


function MainNav({ routes }) {

  return (
    <nav>
      <ul>
        {routes.map((elem, index) => getRoute(elem, index))}
      </ul>
    </nav >
  )
}

function getRoute(route, key) {
  return (

    <li key={key}>
      <Link to={route.url}>
        <button type="button" >{route.title}</button>
      </Link>
    </li>
  )
}

export default MainNav;