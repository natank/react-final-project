import React, { useEffect, useContext, useState } from 'react'
import { today } from '../../Utils/utils';
import { MainContext } from '../../Context/main-context'

export default function SubscriptionForm({ onFormCancel, onSubscription, memberId }) {

  var { store } = useContext(MainContext);
  var [state, dispatch] = store;
  var { members, movies } = state;

  var memberDetails = members.find(function compareMemberIds(member) { return member.id == memberId })
  memberDetails.movies = memberDetails.movies || []

  var moviesNotWatched = movies.filter(isMovieNotWatched)

  function isMovieNotWatched(currMovie) {
    return !memberDetails.movies.some(
      function compareMovieIds(currMemberMovie) {
        var result = currMovie.id == currMemberMovie.movieId
        return result;
      }
    )
  }

  var [selectedMovieId, setSelectedMovieId] = useState(moviesNotWatched[0] ? moviesNotWatched[0].id : "")
  var [selectedMovieDate, setSelectedMovieDate] = useState(today())

  useEffect(() => {
    // check that selected movie id is in movies not watched
    var isSelectedMovieWatched = !isMovieNotWatched({ id: selectedMovieId })
    if (isSelectedMovieWatched) {
      setSelectedMovieId(moviesNotWatched[0] ? moviesNotWatched[0].id : undefined)
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <h4>Add a new movie</h4>
      <select name="movies" value={selectedMovieId} onChange={
        function (event) {
          setSelectedMovieId(event.target.value)
        }
      }>
        <MovieOptions />
      </select>
      <input type="date" name="watch" value={selectedMovieDate} onChange={function (event) {
        setSelectedMovieDate(event.target.value)
      }} /><br />
      <input type="submit" value="Subscribe" disabled={moviesNotWatched.length == 0} />
      <input type="button" value="cancel" onClick={onFormCancel} />

    </form>
  )

  function MovieOptions(props) {

    return moviesNotWatched.map(movie => {
      return (
        <option key={movie.id} value={movie.id}>{movie.name}</option>
      )
    })
  }

  function onSubmit(event) {
    event.preventDefault();
    if (selectedMovieId == undefined) return

    var subscriptionDetails = {
      memberId,
      movieId: selectedMovieId,
      date: selectedMovieDate
    }
    onSubscription(subscriptionDetails)
  }
}