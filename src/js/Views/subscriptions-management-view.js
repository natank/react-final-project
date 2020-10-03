import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MembersManagementContextProvider } from '../Context/members-management-context';
import EditMember from '../components/Subscriptions/EditMember'
import MembersNav from '../components/Subscriptions/MembersNav'
import AllMembers from '../components/Subscriptions/AllMembers'
import AddMember from '../components/Subscriptions/AddMember'
import MemberUrlWrapper from '../components/Subscriptions/MemberUrlWrapper'

export default function MembersManagement({ match }) {

  return (
    <MembersManagementContextProvider match={match}>
      <Switch>
        <Route exact path={`${match.url}/edit/:id`}>

          <h1>Members</h1>
          <EditMember />

        </Route>
        <Route path={match.url}>

          <h1>Subscriptions</h1>
          <Route exact path={`${match.url}`} component={AllMembers} />
          <Switch>
            <Route exact path={`${match.url}/add`} component={AddMember} />
            <Route path={`${match.url}/:id`} component={MemberUrlWrapper} />
          </Switch>
        </Route>
      </Switch>
    </MembersManagementContextProvider>
  )
}
