import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';

import { MainContext } from '../../Context/main-context';


export default function MemberSubscriptions({ member }) {

  var [subscriptionFormActive, setSubscriptionsFormActive] = useState(false)
  const { store, moviesManagementUrl } = useContext(MainContext)
  var [state, dispatch] = store;
  var allMovies = [...state.movies]
  var subscribedMovies = member.movies
  const memberId = member.id;
  if (subscribedMovies)
    return (
      <SubscribedMovies />
    )
  else return <div>No subscriptions yet</div>

  function SubscribedMovies(props) {
    return subscribedMovies.map(subscribedMovie => {
      var movie = getMovieById(subscribedMovie.movieId);
      if (!movie) return null;
      return (
        <ul key={movie.id}>
          <li>
            <Link to={`${moviesManagementUrl}/${movie.id}`}>{`${movie.name} , `}</Link>
            <span>{subscribedMovie.date}</span>
          </li>
        </ul>
      )
    })
  }
  function getMovieById(paramId) {
    var movie = allMovies.find(function compareId(movie) {
      var result = movie.id == paramId
      return result
    })
    return movie;
  }
}

