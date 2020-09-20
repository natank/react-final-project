import React from 'react';
import UsersNav from './UsersNav';
import UserForm from './UserForm'
export default function AddUser() {
  function onCreateUser(event) {
    return null
  }
  return (
    <div>
      <UsersNav />
      <h2>Add New User</h2>
      <UserForm userDetails={{ key: null }} actionText="Create" onSubmit={onCreateUser} />

    </div>
  )
}
