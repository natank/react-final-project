import React, { useState, useReducer, createContext } from 'react';

export var MainContext = createContext();

var initialState = {
  users: [
    {
      id: 1,
      firstName: "Avi",
      lastName: "Cohen",
      userName: "avi@gmail.com",
      sessionTimeOut: 20,
      createdDate: "11/12/1998",
      permissions: ["View Subscriptions", "Create Subscriptions"]
    },
    {
      id: 3,
      firstName: "Meir",
      lastName: "Gotlib",
      userName: "gotlib@gmail.com",
      sessionTimeOut: 60,
      createdDate: "11/12/1998",
      permissions: ["View Subscriptions", "Create Subscriptions"]
    }

  ],
  movies: [
    {
      id: 3,
      Name: "Under the dome",
      Generes: ["Genere1", "Genere2"],
      Image: "https://via.placeholder.com/600/771796",
      Premiered: new Date(Date.UTC(72, 4, 5))
    },
    {
      id: 4,
      Name: "Under the dome",
      Generes: ["Genere1", "Genere2"],
      Image: "https://via.placeholder.com/600/771796",
      Premiered: new Date(Date.UTC(72, 4, 5))
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
  var [isEditingUser, setIsEditingUser] = useState(false);

  const MainReducer = useReducer(reducer, initialState);

  function resetMainView() {
    setIsEditingUser(false);
  }

  return (
    <MainContext.Provider value={{ isEditingUser, setIsEditingUser, MainReducer, resetMainView }}>
      {props.children}
    </MainContext.Provider>
  )
}