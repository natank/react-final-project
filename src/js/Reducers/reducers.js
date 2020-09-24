import { useReducer } from "react";

var users = [];


function usersReducerFn(users, action) {
  switch (action.type) {
    case "CREATE":
      return [...users]
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

export var usersReducer = useReducer(usersReducerFn, users)


export function permissionsReducer(permissions, action) {
  switch (action.type) {
    case "ADD":
      let newPermissions = action.payload;
      
      return [newPermissions, action.payload]

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
