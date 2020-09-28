import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { MainContext } from '../../Context/main-context';
import UserForm from './UserForm';
import { updateUser } from '../../Model/user-model'
import { updateUserPermissions } from '../../Model/user-permissions-model'
import { UsersManagementContext } from '../../Context/users-management-context'
import { compareItemId } from '../../Utils/utils'
export default function EditUser({ match }) {
    var { usersStore, usersPermissionsStore } = useContext(MainContext);

    var [usersState, usersDispatch] = usersStore;

    var [usersPermissionsState, usersPermissionsDispatch] = usersPermissionsStore;

    var userId = match.params.id;

    var { users } = usersState
    var { usersPermissions } = usersPermissionsState

    var editedUser = users.find(compareItemId(userId))
    var editedUserPermissions = usersPermissions.find(function compareUserPermissionsId(userPermissions) {
        var result = userPermissions.userId == userId
        return result
    })
    var { usersManagementUrl } = useContext(UsersManagementContext)
    var history = useHistory()

    return (
        <div>
            {editedUser && editedUserPermissions ?
                <div>
                    <h2>Edit User: {`${editedUser.firstName} ${editedUser.lastName}`}</h2>
                    <UserForm userDetails={editedUser} editedUserPermissions={editedUserPermissions} actionText="Update" onSubmit={onUpdateUser} />
                </div> : <div>{null}</div>
            }

        </div>
    )

    async function onUpdateUser(userDetails, userPermissions) {
        users = await updateUser(userDetails)
        usersPermissions = await updateUserPermissions(userPermissions)
        usersDispatch({
            type: "LOAD",
            payload: { users }
        })
        usersPermissionsDispatch({
            type: "LOAD",
            payload: { usersPermissions }
        })
        history.push(usersManagementUrl)
    }
}