import React, { useContext } from 'react'
import { Route, Redirect, useRouteMatch } from 'react-router-dom'
import { MainContext } from '../../Context/main-context'
import { checkAccsessToRoute } from '../../Utils/utils'
export default function PrivateRoute({ match, component: Component, ...rest }) {
  var { store } = useContext(MainContext)
  var [state] = store;
  var { authUser } = state
  var match = useRouteMatch()
  console.log(`url: ${match.url}`);

  return (
    < Route {...rest} render={props => {
      var result = checkAccsessToRoute(`${match.url}`, authUser)
      return result
        ? <Component {...props} />
        : <Redirect to='/' />

    }} />

  )
}



