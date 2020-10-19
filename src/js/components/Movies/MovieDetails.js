import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MainContext } from '../../Context/main-context';
import { deleteMovie } from '../../Model/movie-model'
import MovieSubscriptions from './MovieSubscriptions'
import { checkAccessToRoute } from '../../Utils/utils'
export default function MovieDetails({ movie, match }) {
  var history = useHistory();
  var { store } = useContext(MainContext);
  var [state, dispatch] = store;
  var { authUser } = state

  if (!movie) return null;

  var editMovieRoute = `${match.url}/edit/${movie.id}`
  var deleteMovieRoute = `${match.url}/delete/${movie.id}`
  var isUserAllowedToDelete = checkAccessToRoute(deleteMovieRoute, authUser)
  var isUserAllowedToEdit = checkAccessToRoute(editMovieRoute, authUser)
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
      {isUserAllowedToEdit
        ? <Link to={`${match.url}/edit/${movie.id}`}>
          <input type="button" value="Edit" />
        </Link>
        : null
      }
      {isUserAllowedToDelete
        ? <input type="button" value="Delete" onClick={onDeleteMovie} />
        : null
      }
    </div >)

  async function onDeleteMovie(event) {
    event.preventDefault();
    var movieId = movie.id;
    try {
      await deleteMovie(movie.id)
    } catch (err) {
      console.log(err)
    }
    dispatch({
      type: "REMOVE_MOVIE",
      payload: { movieId }
    })
  }

}