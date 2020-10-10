import React, { useContext } from 'react'
import MemberDetails from './MemberDetails'
import { MainContext } from '../../Context/main-context'
import MembersNav from './MembersNav';

export default function AllMembers({ match }) {

  var { store } = useContext(MainContext)

  var [state, dispatch] = store;

  var { members } = state;

  return (
    <div>
      <MembersNav match={match} />
      <ul>
        {
          members ? members.map(function renderMember(member) {
            var props = { member, match }
            return <MemberDetails key={member.id} {...props} />
          }) : null
        }
      </ul>
    </div>
  )
}