import React, { useContext, useState } from 'react'
import {Container, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import MovieDetails from './MovieDetails'
import { MainContext } from '../../Context/main-context'
import MoviesNav from './MoviesNav';
import FindMovie from './FindMovie'


const useStyles = makeStyles({
  navContainer : {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})


export default function AllMovies({ match }) {

  var { store } = useContext(MainContext);

  var [state, dispatch] = store

  var [filterString, setFilterString] = useState('');

  var movies = [...state.movies];
  if (filterString.length > 2) {
    movies = movies.filter(function (movie) {
      return movie.name.toLowerCase().includes(filterString)
    })
  }
  var classes = useStyles();
  return (
    <Grid container 
      direction="column"
      spacing={4}
    >

      <Grid item container alignItems="center" justify="center">
        <MoviesNav match={match} />
        <FindMovie {...{ changeFilter }} />
      </Grid>
      <Grid item container 
        component="ul"
      >
        {
          movies ? movies.map(function renderMovie(movie) {
            return <MovieDetails key={movie.id} {...{ movie, match }} />
          }) : null
        }
      </Grid>
    </Grid>
    
  )

  function changeFilter(newFilter) {
    setFilterString(newFilter)
  }
}