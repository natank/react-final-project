import React from 'react';
import MoviesNav from './MoviesNav';
import MovieForm from './MovieForm'
export default function AddMovie() {
  function onCreateMovie(event) {
    return null
  }
  return (
    <div>
      <MoviesNav />
      <h2>Add New Movie</h2>
      <MovieForm movieDetails={{ key: null }} actionText="Create" onSubmit={onCreateMovie} />

    </div>
  )
}
