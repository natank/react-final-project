import React from 'react'
import { Route } from 'react-router-dom'
import { MembersManagementContextProvider } from '../Context/members-management-context';

import AllMembers from '../components/Subscriptions/AllMembers';
import AddMember from '../components/Subscriptions/AddMember';
import EditMember from '../components/Subscriptions/EditMember'


export default function MembersManagement({ match }) {

  return (
    <MembersManagementContextProvider match={match}>
      <h1>Members</h1>
      <Route path={`${match.url}/add`} component={AddMember} />
      <Route exact path={`${match.url}`} component={AllMembers} />
      <Route path={`${match.url}/edit/:id`} component={EditMember} />
    </MembersManagementContextProvider>
  )
}
