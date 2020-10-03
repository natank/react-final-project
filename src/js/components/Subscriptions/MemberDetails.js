import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import MemberSubscriptions from './MemberSubscriptions'
import SubscriptionForm from './SubscriptionForm'
import { MainContext } from '../../Context/main-context'

import { addMemberSubscription } from '../../Model/member-model'

export default function MemberDetails({ member, match }) {
  var { membersStore } = useContext(MainContext)
  var [membersState, membersDispatch] = membersStore;

  var [subscriptionFormActive, setSubscriptionsFormActive] = useState(false)
  if (member) {
    var memberId = member.id;
    return (
      <div>
        <h3>{member.name}</h3>
        <p>{`Email: ${member.email}`}</p>
        <Link to={`${match.url}/edit/${member.id}`}>
          <input type="button" value="Edit" onClick={() => { }} />
        </Link>
        <input type="button" value="Delete" onClick={() => { }} />

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
    var members = await addMemberSubscription(subscriptionDetails)
    membersDispatch({
      type: "LOAD",
      payload: { members }
    })
  }
}