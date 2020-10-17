import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MainContext } from '../Context/main-context'

function MainNav({ routes }) {
  var { store } = useContext(MainContext)
  var [state, dispatch] = store;

  return (
    <nav>
      <ul>
        {routes.map((elem, index) => getRoute(elem, index))}
        <li>
          <button type="button" onClick={onLogout}>Logout</button>
        </li>
      </ul>
    </nav >
  )
  function onLogout(event) {
    event.preventDefault()
    dispatch({
      action: { TYPE: "LOGOUT_USER" }
    })
  }

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