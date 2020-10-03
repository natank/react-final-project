import React, { useContext } from 'react';
import MoviesNav from './MoviesNav';
import MovieForm from './MovieForm'
import { MainContext } from '../../Context/main-context'
import { addMovie } from '../../Model/movie-model'

export default function AddMovie(props) {
  var { moviesStore } = useContext(MainContext);
  var [moviesState, moviesDispatch] = moviesStore;


  return (
    <div>
      <MoviesNav />
      <h2>Add New Movie</h2>
      <MovieForm actionText="Create" onSubmitCb={onCreateMovie} />
    </div>
  )

  async function onCreateMovie(movieDetails) {
    var details = { ...movieDetails }
    details.generes = details.generes.split(',')
    var movies = await addMovie(details);
    moviesDispatch({
      type: "LOAD",
      payload: { movies }
    })
  }
}
