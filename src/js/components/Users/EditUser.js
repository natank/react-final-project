import React, { useState, useContext } from 'react'
import { MainContext } from '../../Context/main-context';
import UserForm from './UserForm';
export default function EditUser({ match }) {
    var { usersReducer, permissionsReducer } = useContext(MainContext);

    var [users, usersDispatch] = usersReducer;


    var [permissions, permissionsDispatch] = permissionsReducer;

    var userId = match.params.id;

    var editedUser = users.find(function compareId(user) {
        var result = user.id == userId;
        return result;
    })
    var editedPermissions = permissions.find(function comperPermissionsId(permission) {
        var result = permission.userId == userId
        return result
    })
    return (
        <div>
            <h2>Edit User: {`${editedUser.firstName} ${editedUser.lastName}`}</h2>
            <UserForm userDetails={editedUser} permissionsDetails={editedPermissions} actionText="Update" onSubmit={onUpdateUser} />
        </div>
    )
    function onUpdateUser(userDetails, permissionsDetails) {
        usersDispatch({
            type: "UPDATE_USER",
            payload: userDetails
        })
        permissionsDispatch({
            type: "UPDATE_PERMISSIONS",
            payload: permissionsDetails
        })
    }
}