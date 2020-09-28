import React from 'react'
import SubscriptionForm from './SubscriptionForm'

export default function MemberSubscriptions(props) {
  return (
    <div>
      <h4>Movies Watched</h4>
      <input type="button" value="Subscribe to new movie" />
      <SubscriptionForm />
    </div>
  )
}