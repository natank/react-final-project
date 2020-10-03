import React, { useContext } from 'react'
import MemberDetails from './MemberDetails'
import { MainContext } from '../../Context/main-context'
import MembersNav from './MembersNav';

export default function AllMembers({ match }) {

  var context = useContext(MainContext)
  var { membersStore } = context

  var [membersState, membersDispatch] = membersStore;

  var members = membersState.members;

  return (
    <div>
      <MembersNav match={match} />
      <ul>
        {
          members.map(function renderMember(member) {
            var props = { member, match }
            return <MemberDetails key={member.id} {...props} />
          })
        }
      </ul>
    </div>
  )
}