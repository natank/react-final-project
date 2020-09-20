import React, { useReducer, createContext } from 'react'

const initialState = {
  editedUserId: -1,
}

var reducer = (state, action) => {
  switch (action.type) {
    case "SET_EDITED_USER_ID":
      return {
        editedUserId: action.payload
      }
    case "SET_EDITING_USER":
      return {
        editingUser: action.payload
      }
    default:
      throw new Error("UsersManagement: Unknown action type")
  }
}


export var UsersManagementContext = createContext([{}, function () { }]);

export var UsersManagementContextProvider = function (props) {
  var [state, dispatch] = useReducer(reducer, initialState);

  var { match } = props;
  var usersManagementUrl = match.url;
  return (
    <UsersManagementContext.Provider value={{
      state: [state, dispatch],
      usersManagementUrl
    }}>
      {props.children}
    </UsersManagementContext.Provider>
  )
}

