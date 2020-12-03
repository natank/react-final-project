import React, { useContext, useState } from 'react'
import {Grid} from '@material-ui/core'
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
  },
  movieCardContainer:{
    width: "20%"
  }
})


export default function AllMovies({ match, navIndex, setNavIndex }) {

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
    <Grid item container 
      direction="column"
      spacing={6}
      className={classes.mainContainer}
      id="allMoviesContainer"
    >

      <Grid item container 
        alignItems="center" 
        justify="center"
        id="movieMenuContainer"
        direction="column"
      >
        <Grid item></Grid><MoviesNav match={match} navIndex={navIndex} setNavIndex={setNavIndex}/></Grid>
        <Grid item container justify="center"><FindMovie {...{ changeFilter }} /><Grid></Grid>
      </Grid>
      <Grid item container 
        id = "movieGridContainer"
        component="ul" spacing={2} justify="center"
      >
        {
          movies ? movies.map(function renderMovie(movie) {
            return (
              <Grid item key={movie.id} className={classes.movieCardContainer}>
                <MovieDetails {...{ movie, match }} />
              </Grid>
              )
          }) : null
        }
      </Grid>
    </Grid>
    
  )

  function changeFilter(newFilter) {
    setFilterString(newFilter)
  }
}