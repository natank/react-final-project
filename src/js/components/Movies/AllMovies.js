import React, { useContext } from 'react'
import MovieDetails from './MovieDetails'
import { MainContext } from '../../Context/main-context'
import MoviesNav from './MoviesNav';

export default function AllMovies({ match }) {

  var { moviesStore } = useContext(MainContext);

  var [moviesState, moviesDispatch] = moviesStore

  var movies = moviesState.movies;

  return (
    <div>
      <MoviesNav match={match} />
      <ul>
        {
          movies.map(function renderMovie(movie) {
            return <MovieDetails key={movie.id} movie={movie} match={match} />
          })
        }
      </ul>
    </div>
  )
}