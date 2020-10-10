import React, { useContext, useState } from 'react'
import MovieDetails from './MovieDetails'
import { MainContext } from '../../Context/main-context'
import MoviesNav from './MoviesNav';
import FindMovie from './FindMovie'
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

  return (
    <div>
      <MoviesNav match={match} />
      <FindMovie {...{ changeFilter }} />

      <ul>
        {
          movies ? movies.map(function renderMovie(movie) {
            return <MovieDetails key={movie.id} {...{ movie, match }} />
          }) : null
        }
      </ul>
    </div>
  )

  function changeFilter(newFilter) {
    setFilterString(newFilter)
  }
}