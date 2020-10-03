import React, { useContext, useState } from 'react'
import { today } from '../../Utils/utils';
import { MainContext } from '../../Context/main-context'

export default function SubscriptionForm({ onFormCancel, onSubscription, memberId }) {

  var { moviesStore, membersStore } = useContext(MainContext);
  var [moviesState, moviesDispatch] = moviesStore;
  var [membersState, membersDispatch] = membersStore;
  var { members } = membersState;
  var { movies } = moviesState;

  var memberDetails = members.find(member => member.id == memberId)
  var moviesNotWatched = movies.filter(currMovie => {
    return !memberDetails.movies.some(currMemberMovie => {
      var result = currMovie.id == currMemberMovie.movieId
      return result;
    }
    )
  })
  var [selectedMovieId, setSelectedMovieId] = useState(moviesNotWatched[0] ? moviesNotWatched[0].id : "")
  var [selectedMovieDate, setSelectedMovieDate] = useState(today())
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
      <input type="submit" value="Subscribe" />
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
    var subscriptionDetails = {
      memberId,
      movieId: selectedMovieId,
      date: selectedMovieDate
    }
    onSubscription(subscriptionDetails)
  }
}