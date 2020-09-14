import React, { useReducer, createContext } from 'react';

export var MainContext = createContext();

var initialState = {
  users: [
    {
      id: 1,
      firstName: "Avi",
      lastName: "Cohen",
      userName: "avi@gmail.com",
      sessionTimeOut: 60,
      createdDate: "11/12/1998",
      permissions: {
        viewSubscriptions: true,
        createSubscriptions: false,
        deleteSubscriptions: false,
        updateSubscriptions: false,
        viewMovies: true,
        createMovies: true,
        deleteMovies: false,
        updateMovies: false,

      }
    },
    {
      id: 2,
      firstName: "Meir",
      lastName: "Gotlib",
      userName: "gotlib@gmail.com",
      sessionTimeOut: 60,
      createdDate: "11/12/1998",
      permissions: {
        viewSubscriptions: true,
        createSubscriptions: false,
        deleteSubscriptions: false,
        updateSubscriptions: false,
        viewMovies: true,
        createMovies: true,
        deleteMovies: false,
        updateMovies: false,

      }
    }

  ]
}

var reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        users: [...state.users, action.payload]
      }
    case "DELETE_USER":
      return {
        users: state.users.filter(
          user => user.id !== action.payload
        )
      }
    case "UPDATE_USER":
      var users = state.users.filter(
        user => user.id !== action.payload.id
      )
      return {
        users: [...users, action.payload]
      }
    default:
      throw new Error("MainContext: Unknown action type")
  }
}

export var MainContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MainContext.Provider value={[state, dispatch]}>
      {props.children}
    </MainContext.Provider>
  )
}