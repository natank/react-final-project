import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { MembersManagementContextProvider } from '../Context/members-management-context';
import EditMember from '../components/Subscriptions/EditMember'
import MembersNav from '../components/Subscriptions/MembersNav'
import AllMembers from '../components/Subscriptions/AllMembers'
import AddMember from '../components/Subscriptions/AddMember'
import MemberUrlWrapper from '../components/Subscriptions/MemberUrlWrapper'
import PrivateRoute from '../components/Auth/PrivateRoute'

export default function MembersManagement({ match }) {

  function editMemberAndTitle(props) {
    return (
      <div>
        <h1>Members</h1>
        <EditMember />
      </div>
    )
  }

  return (
    <MembersManagementContextProvider match={match}>
      <Switch>
        <Route exact path={`${match.url}/edit/:id`}>
          <PrivateRoute {...{ component: editMemberAndTitle }} />

        </Route>
        <Route path={match.url}>

          <h1>Subscriptions</h1>
          <Route exact path={`${match.url}`} component={AllMembers} />
          <Switch>
            <Route exact path={`${match.url}/add`}>
              <PrivateRoute {...{ component: AddMember }} />
            </Route>
            <Route path={`${match.url}/:id`} component={MemberUrlWrapper} />
          </Switch>
        </Route>
      </Switch>
    </MembersManagementContextProvider>
  )
}
