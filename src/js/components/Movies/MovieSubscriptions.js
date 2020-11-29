import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MainContext } from '../../Context/main-context';

const useStyles = makeStyles({
  movieSubscriptions: {
    paddingInlineStart: 0

  }
})


export default function MovieSubscriptions({ movie }) {
  var classes = useStyles()
  var { store, membersManagementUrl } = useContext(MainContext);
  var [state, dispatch] = store;

  var { members } = state;

  var movieSubscriptions = getMovieSubscriptions();


  return (
    <List component="ul" aria-label="movie subscriptions" className={classes.movieSubscriptions}>
      {movieSubscriptions ? movieSubscriptions.map(renderSubscription) : null}
    </List>
  )


  function renderSubscription(subscription, index) {
    return (
      <ListItem component={Link} key={index}
        disableGutters
        to={`${membersManagementUrl}/${subscription.member.id}`}
      >
        <ListItemText>{`${subscription.member.name} ${subscription.date}`}</ListItemText>
        
      </ListItem>
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
      var subscription = member.movies && member.movies.find(currMovie => currMovie.movieId == movie.id)
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