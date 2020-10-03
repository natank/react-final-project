import React, { useContext, useState } from 'react'
import MovieDetails from './MovieDetails'
import { MainContext } from '../../Context/main-context'
import MoviesNav from './MoviesNav';
import FindMovie from './FindMovie'
export default function AllMovies({ match }) {

  var { moviesStore } = useContext(MainContext);

  var [moviesState, moviesDispatch] = moviesStore

  var [filterString, setFilterString] = useState('');

  var movies = [...moviesState.movies];
  if (filterString.length > 2) {
    movies = movies.filter(function (movie) {
      return movie.name.toLowerCase().includes(filterString)
    })
  }

  return (
    <div>
      <MoviesNav match={match} />
      <FindMovie {...{ changeFilter }} />

      <ul>
        {
          movies.map(function renderMovie(movie) {
            return <MovieDetails key={movie.id} {...{ movie, match }} />
          })
        }
      </ul>
    </div>
  )

  function changeFilter(newFilter) {
    setFilterString(newFilter)
  }
}