import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MainContext } from '../../Context/main-context';
import { MoviesManagementContext } from '../../Context/movies-management-context';
import { deleteMovie } from '../../Model/movie-model'
import MovieSubscriptions from './MovieSubscriptions'
export default function MovieDetails({ movie, match }) {
  const { moviesManagementUrl } = useContext(MoviesManagementContext)
  var history = useHistory();
  var { moviesStore } = useContext(MainContext);
  var [moviesState, moviesDispatch] = moviesStore;
  if (!movie) return null;
  return (
    <div>
      <h3>{`${movie.name}, ${(new Date(movie.premiered)).getFullYear()} `}</h3>
      <p>{`Generes: ${movie.generes.map(genere => genere)}`}</p>
      <div style={{ display: "flex" }}>
        <picture><img src={`${movie.image}`} width={50} /></picture>
        <div>
          <p>Subscriptions watched</p>

          <MovieSubscriptions movie={movie} />

        </div>
      </div>
      <Link to={`${match.url}/edit/${movie.id}`}>
        <input type="button" value="Edit" />
      </Link>
      <input type="button" value="Delete" onClick={onDeleteMovie} />
    </div >)

  async function onDeleteMovie(event) {
    event.preventDefault();
    var movies = await deleteMovie(movie.id)
    moviesDispatch({
      type: "LOAD",
      payload: { movies }
    })
    history.push(moviesManagementUrl)

  }

}