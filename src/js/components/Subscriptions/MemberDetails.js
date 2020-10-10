import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import MemberSubscriptions from './MemberSubscriptions'
import SubscriptionForm from './SubscriptionForm'
import { MainContext } from '../../Context/main-context'

import { addMemberSubscription, deleteMember, updateMember } from '../../Model/member-model'

export default function MemberDetails({ member, match }) {
  var history = useHistory();
  var { store, membersManagementUrl } = useContext(MainContext)
  var [state, dispatch] = store;
  var [subscriptionFormActive, setSubscriptionsFormActive] = useState(false)
  if (member) {
    var memberId = member.id;
    return (
      <div>
        <h3>{member.name}</h3>
        <p>{`Email: ${member.email}`}</p>
        <Link to={`${match.url}/edit/${member.id}`}>
          <input type="button" value="Edit" />
        </Link>
        <input type="button" value="Delete" onClick={onDeleteMember} />

        <h4>Movies Watched</h4>
        <input type="button" value="Subscribe to new movie" onClick={onSubscribeClick} />
        {subscriptionFormActive ? <SubscriptionForm {...{ memberId, onFormCancel, onSubscription }} /> : null}
        <MemberSubscriptions member={member} />
      </div>
    )
  }
  return null

  function onSubscribeClick(event) {
    event.preventDefault();
    setSubscriptionsFormActive(true)
  }

  function onFormCancel(event) {
    event.preventDefault();
    setSubscriptionsFormActive(false)
  }

  async function onSubscription(subscriptionDetails) {
    var { movieId, date } = subscriptionDetails
    var movies = [...member.movies, { movieId, date }];
    var updatedDetails = { ...member, movies }
    var updatedMemberDetails = await updateMember(memberId, updatedDetails)

    dispatch({
      type: "UPDATE_MEMBER",
      payload: { member: updatedMemberDetails }
    })
  }

  async function onDeleteMember(event) {
    event.preventDefault();
    var memberId = member.id;
    try {
      await deleteMember(member.id)
    } catch (err) {
      console.log(err)
    }
    dispatch({
      type: "REMOVE_MEMBER",
      payload: { memberId }
    })

  }
}