import React from 'react'
import { MembersManagementContextProvider } from '../Context/members-management-context';
import Subscriptions from '../components/Subscriptions/Subscriptions'



import MemberDetails from '../components/Subscriptions/MemberDetails'

export default function MembersManagement({ match }) {

  return (
    <MembersManagementContextProvider match={match}>
      <Subscriptions />
    </MembersManagementContextProvider>
  )
}
