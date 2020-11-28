import { fromPairs } from 'lodash';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import {Menu, MenuItem, Tabs, Tab} from '@material-ui/core'
import { MoviesManagementContext } from '../../Context/movies-management-context'
import { MainContext } from '../../Context/main-context'
import { checkAccessToRoute } from '../../Utils/utils'

export default function MoviesNav(props) {
  var { store } = useContext(MainContext)
  var [state, dispatch] = store;
  var { authUser } = state
  var { moviesManagementUrl } = useContext(MoviesManagementContext)

  var routes = [{
    url: `${moviesManagementUrl}`,
    title: "All Movies"
  },
  {
    url: `${moviesManagementUrl}/add`,
    title: "Add Movies"
  }]

  return (
    <Tabs value={0}>
      {routes.map((route, index) => {
        var isAuthorized = checkAccessToRoute(`${moviesManagementUrl}/add`, authUser);
        return (
          isAuthorized ?
            <Tab 
              component={Link}
              to={`${route.url}`} 
              key={index}
              label = {`${route.title}`}
            /> : null
        )  
            
      })}
    </Tabs>
  )
}
