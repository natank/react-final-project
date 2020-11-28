import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MoviesManagementContextProvider } from '../Context/movies-management-context';
import {Typography } from '@material-ui/core'
import AllMovies from '../components/Movies/AllMovies';
import AddMovie from '../components/Movies/AddMovie';
import EditMovie from '../components/Movies/EditMovie'
import MovieUrlWrapper from '../components/Movies/MovieUrlWrapper'
import PrivateRoute from '../components/Auth/PrivateRoute'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  mainContainer : {
    display
  }
})


export default function MoviesManagement({ match }) {

  return (
    <MoviesManagementContextProvider match={match}>
      <Container className= {classes.mainContainer}>
        <Typography variant="h2" align="center">Movies</Typography>
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
      </Container>
    </MoviesManagementContextProvider>
  )
}
