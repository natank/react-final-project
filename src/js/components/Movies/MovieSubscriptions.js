import React, { useContext } from 'react';
import { MainContext } from '../../Context/main-context';
import { MembersManagementContext } from '../../Context/members-management-context'
import { Link } from 'react-router-dom';
export default function MovieSubscriptions({ movie }) {
  var { store, membersManagementUrl } = useContext(MainContext);
  var [state, dispatch] = store;

  var { members } = state;

  var movieSubscriptions = getMovieSubscriptions();


  return (
    <ul>
      {movieSubscriptions ? movieSubscriptions.map(renderSubscription) : null}
    </ul>
  )


  function renderSubscription(subscription, index) {
    return (
      <li key={index}>
        <Link to={`${membersManagementUrl}/${subscription.member.id}`}>{subscription.member.name}</Link>
        <span>{subscription.date}</span>
      </li>
    )
  }

  function extractMembersEntriesFromMovieSubscriptions(subscriptions) {
    return subscriptions.map(function (subscription) {
      var member = extractMemberFromSubscription(subscription);
      var date = extractMovieDateFromSubscription(subscription)
      return { member, date }
    })
  }



  function extractMovieDateFromSubscription(subscription) {
    var movieDate = "";
    var movieDetails = subscription.movies.find(currMovie => currMovie.id == movie.id)
    movieDate = movieDetails.watched
    return movieDate;
  }

  function extractMemberFromSubscription(subscription) {
    return members ? members.find(function (member) {
      return member.id == subscription.memberId
    }) : null
  }


  function getMovieSubscriptions() {
    // loop through all the members. Filter in members who are subscribed to movie
    return members ? members.reduce(function createSubscription(acc, member) {
      var subscription = member.movies.find(currMovie => currMovie.movieId == movie.id)
      if (subscription) {
        subscription = {
          member: {
            id: member.id,
            name: member.name
          },
          date: subscription.date
        }
        return [...acc, subscription]
      }
      return acc
    }, []) : null
  }
}