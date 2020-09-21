import React, { useContext } from 'react'
import MemberDetails from './MemberDetails'
import { MainContext } from '../../Context/main-context'
import SubscriptionsNav from './MembersNav';

export default function AllMembers({ match }) {

  var { MainReducer } = useContext(MainContext)

  var [mainState, mainDispatch] = MainReducer;

  var members = mainState.members;

  return (
    <div>
      <SubscriptionsNav match={match} />
      <ul>
        {
          members.map(function renderMember(member) {
            return <MemberDetails key={member.id} member={member} match={match} />
          })
        }
      </ul>
    </div>
  )
}