import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MainContext } from '../Context/main-context'
import { checkAccessToRoute } from '../Utils/utils'
function MainNav({ routes }) {
  var { store } = useContext(MainContext)
  var [state, dispatch] = store;
  var { authUser } = state 
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
        type: "LOGOUT_USER" 
    })
  }



  function getRoute(route, key) {
    var isAuthorized = checkAccessToRoute(route.url, authUser)
    return (

      isAuthorized ?
        <li key={key}>
          < Link to={route.url} >
            <button type="button" >{route.title}</button>
          </Link >
        </li > : null

    )
  }
}

export default MainNav;