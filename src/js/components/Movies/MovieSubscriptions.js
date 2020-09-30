import React, { useContext } from 'react';
import { MainContext } from '../../Context/main-context';
import {MembersManagementContext} from '../../Context/members-management-context'
import {Link} from 'react-router-dom';
export default function MovieSubscriptions({ movie }) {
  var { subscriptionsStore, membersStore, membersManagementUrl } = useContext(MainContext);
  var [membersState, membersDispatch] = membersStore;
  var [subscriptionsState, subscriptionsDispatch] = subscriptionsStore

    var { members } = membersState;
  var { subscriptions } = subscriptionsState;

  var subscriptionsWatched = getMovieSubscriptions(subscriptions);
  var membersWatched = extractMembersEntriesFromMovieSubscriptions(subscriptionsWatched, movie.id)

  return (
    <ul>
      {membersWatched ? membersWatched.map(renderMemberEntry) : null}
    </ul>
  )


  function renderMemberEntry(memberEntry, index) {
    return (
      <li key={index}>
        <Link to={`${membersManagementUrl}/:${memberEntry.member.id}`}>{memberEntry.member.name}</Link>
        <span>{memberEntry.date}</span>
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


  function isSubscribedToMovie(subscription) {
    var isSubscribed = subscription.movies.some(isTheMovie)
    return isSubscribed;
  }

  function isTheMovie(currMovie) {
    return (movie.id == currMovie.id)
  }

  function extractMemberFromSubscription(subscription) {
    return members.find(function (member) {
      return member.id == subscription.memberId
    })
  }


  function getMovieSubscriptions(subscriptions) {
    var movieSubscriptions = subscriptions.filter(isSubscribedToMovie)
    return movieSubscriptions
  }
}