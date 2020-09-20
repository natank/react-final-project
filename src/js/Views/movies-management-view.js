import React from 'react'
import { Route } from 'react-router-dom'
import { MoviesManagementContextProvider } from '../Context/movies-management-context';

import AllMovies from '../components/Movies/AllMovies';
import AddMovie from '../components/Movies/AddMovie';
import EditMovie from '../components/Movies/EditMovie'


export default function MoviesManagement({ match }) {

  return (
    <MoviesManagementContextProvider match={match}>
      <h1>Movies</h1>
      <Route path={`${match.url}/add`} component={AddMovie} />
      <Route exact path={`${match.url}`} component={AllMovies} />
      <Route path={`${match.url}/edit/:id`} component={EditMovie} />
    </MoviesManagementContextProvider>
  )
}
