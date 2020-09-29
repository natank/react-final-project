import React from 'react';
import MembersNav from './MembersNav';
import MemberForm from './MemberForm'
export default function AddMember() {
  function onCreateMember(event) {
    return null
  }
  return (
    <div>
      <MembersNav />
      <h2>Add New Member</h2>
      <MemberForm memberDetails={{ key: null }} actionText="Create" onSubmitCb={onCreateMember} />

    </div>
  )
}
