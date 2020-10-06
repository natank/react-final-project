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
      return (
        <ul key={subscribedMovie.movieId}>
          <li>
            <Link to={`${moviesManagementUrl}/${subscribedMovie.movieId}`}>{`${getMovieById(subscribedMovie.movieId).name} , `}</Link>
            <span>{subscribedMovie.date}</span>
          </li>
        </ul>
      )
    })
  }
  function getMovieById(paramId) {
    return allMovies.find(movie => movie.id == paramId)
  }
}

