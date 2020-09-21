export function usersReducer(users, action) {
  switch (action.type) {
    case "ADD_USER":
      return [...users, action.payload]

    case "DELETE_USER":
      return users.filter(
        user => user.id !== action.payload
      )

    case "UPDATE_USER":
      var users = users.filter(
        user => user.id !== action.payload.id
      )
      return [...users, action.payload]
    default:
      throw new Error("MainContext: Unknown action type")
  }
}


export function permissionsReducer(permissions, action) {
  switch (action.type) {
    case "ADD_PERMISSIONS":
      return [...permissions, action.payload]

    case "DELETE_PERMISSIONS":
      return permissions.filter(
        permission => permission.id !== action.payload
      )

    case "UPDATE_PERMISSIONS":
      var permissions = permissions.filter(
        permission => permission.id !== action.payload.id
      )
      return [...permissions, action.payload]
    default:
      throw new Error("MainContext: Unknown action type")
  }
}
