export function usersReducer(users, action) {
  switch (action.type) {
    case "ADD":
      return [...users, action.payload]

    case "DELETE":
      return users.filter(
        user => user.id !== action.payload
      )

    case "UPDATE":
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
    case "ADD":
      return [...permissions, action.payload]

    case "DELETE":
      return permissions.filter(
        permission => permission.id !== action.payload
      )

    case "UPDATE":
      var permissions = permissions.filter(
        permission => permission.id !== action.payload.id
      )
      return [...permissions, action.payload]
    default:
      throw new Error("MainContext: Unknown action type")
  }
}
