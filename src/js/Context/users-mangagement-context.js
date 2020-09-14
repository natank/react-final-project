import React, { useReducer, createContext } from 'react'
import { useRouteMatch } from 'react-router-dom'



const initialState = {
  editedUserId: -1,
  componentMode: "list"
}

var reducer = (state, action) => {
  switch (action.type) {
    case "SET_EDITED_USER_ID":
      return {
        editedUserId: action.payload
      }
    case "SET_COMPONENT_MODE":
      return {
        componentMode: action.payload
      }
    default:
      throw new Error("UsersManagement: Unknown action type")
  }
}

export const ccc = 4;
export const UMC = createContext();
export var UsersManagementContextProvider = function (props) {
  var [state, dispatch] = useReducer(reducer, initialState);
  var match = useRouteMatch();
  var editUserUrl = `${match.url}/edit`;
  return (
    <UMC.Provider value={{
      state: [state, dispatch],
      editUserUrl
    }}>
      {props.children}
    </UMC.Provider>
  )
}

