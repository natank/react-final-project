import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { MainContext } from '../../Context/main-context';
import UserForm from './UserForm';
import { updateUser } from '../../Model/user-model'
import { updateUserPermissions } from '../../Model/user-permissions-model'
import { UsersManagementContext } from '../../Context/users-management-context'
import { compareItemId } from '../../Utils/utils'
export default function EditUser({ match }) {
    var { store } = useContext(MainContext);

    var [state, dispatch] = store;

    var userId = match.params.id;

    var { users, usersPermissions } = state

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
        dispatch({
            type: "LOAD",
            payload: { ...state, users: [...users], usersPermissions: [...usersPermissions] }
        })
        history.push(usersManagementUrl)
    }
}