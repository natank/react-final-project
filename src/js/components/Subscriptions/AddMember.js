import React, { useContext } from 'react';
import MembersNav from './MembersNav';
import MemberForm from './MemberForm';
import { MainContext } from '../../Context/main-context';
import { addMember } from '../../Model/member-model'

export default function AddMember(props) {
  var { membersStore } = useContext(MainContext);
  var [membersState, membersDispatch] = membersStore;

  return (
    <div>
      <MembersNav />
      <h2>Add New Member</h2>
      <MemberForm actionText="Create" onSubmitCb={onCreateMember} />


    </div>
  )


  async function onCreateMember(memberDetails) {
    var details = { ...memberDetails }
    var members = await addMember(details);
    membersDispatch({
      type: "LOAD",
      payload: { members }
    })
  }
}
