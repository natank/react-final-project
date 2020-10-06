import React, { useContext } from 'react';
import MoviesNav from './MoviesNav';
import MovieForm from './MovieForm'
import { MainContext } from '../../Context/main-context'
import { addMovie } from '../../Model/movie-model'

export default function AddMovie(props) {
  var { store } = useContext(MainContext);
  var [state, dispatch] = store;


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
    dispatch({
      type: "LOAD",
      payload: { ...state, movies: [...movies] }
    })
  }
}
