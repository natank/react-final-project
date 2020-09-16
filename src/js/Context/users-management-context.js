import React, { useReducer, createContext } from 'react'
import { useRouteMatch } from 'react-router-dom'



const initialState = {
  editedUserId: -1,
  editingUser: false
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


export var UsersManagementContext = createContext([{}, function(){}]);

export var UsersManagementContextProvider = function (props) {
  var [state, dispatch] = useReducer(reducer, initialState);
  var match = useRouteMatch();
  var editUserUrl = `${match.url}/edit`;
  return (
    <UsersManagementContext.Provider value={{
      state: [state, dispatch],
      editUserUrl
    }}>
      {props.children}
    </UsersManagementContext.Provider>
  )
}

