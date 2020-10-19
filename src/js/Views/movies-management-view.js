import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MoviesManagementContextProvider } from '../Context/movies-management-context';

import AllMovies from '../components/Movies/AllMovies';
import AddMovie from '../components/Movies/AddMovie';
import EditMovie from '../components/Movies/EditMovie'
import MovieUrlWrapper from '../components/Movies/MovieUrlWrapper'
import PrivateRoute from '../components/Auth/PrivateRoute'

export default function MoviesManagement({ match }) {

  return (
    <MoviesManagementContextProvider match={match}>
      <h1>Movies</h1>
      <Switch>
        <Route path={`${match.url}/add`}>
          <PrivateRoute {...{ component: AddMovie }} />
        </Route>

        <Route exact path={`${match.url}`}>
          <PrivateRoute {...{ component: AllMovies }} />
        </Route>
        <Route path={`${match.url}/edit/:id`}>
          <PrivateRoute {...{ component: EditMovie }} />
        </Route>
        <Route path={`${match.url}/:id`} component={MovieUrlWrapper} />
      </Switch>
    </MoviesManagementContextProvider>
  )
}
