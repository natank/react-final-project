import React, { useContext } from 'react';
import { MainContext } from '../../Context/main-context'
import { usersReducer } from '../../Reducers/reducers';

import UserForm from './UserForm'
export default function AddUser(userDetails, permissionsDetails) {
  var { usersReducer, permissionsReducer } = useContext(MainContext);
  var [users, usersDispatch] = usersReducer;
  var [permissions, permissionsDispatch] = permissionsReducer;
  function onCreateUser(event) {
    usersDispatch({
      type: "ADD",
      payload: { userDetails }
    })
    permissionsDispatch({
      type: "ADD",
      payload: { permissionsDetails }
    })


  }
  return (
    <div>
      <h2>Add New User</h2>
      <UserForm actionText="Create" onSubmit={onCreateUser} />
    </div>
  )
}
