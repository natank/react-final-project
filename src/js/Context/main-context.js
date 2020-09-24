import React, { useReducer, createContext, useEffect, useState } from 'react';
import {getPermissions} from '../Model/permissions-model'
import {getUsers} from '../Model/user-model'

import {
  usersReducer,
  permissionsReducer as _permissionsReducer
}
  from '../Reducers/reducers'
export var MainContext = createContext();



var users = [
  {
    id: 1,
    firstName: "Avi",
    lastName: "Cohen",
    userName: "avi@gmail.com",
    sessionTimeOut: 20,
    createdDate: "11/12/1998"
  },
  {
    id: 3,
    firstName: "Meir",
    lastName: "Gotlib",
    userName: "gotlib@gmail.com",
    sessionTimeOut: 60,
    createdDate: "11/12/1998"
  }

];
var permissions = [
  {
    id: 1,
    userId: 3,
    permissions: {
      subscriptions: {
        view: false,
        edit: false,
        delete: false,
        create: false
      }, movies: {
        view: true,
        edit: false,
        delete: false,
        create: false
      }
    }
  },
  {
    id: 2,
    userId: 1,
    permissions: {
      subscriptions: {
        view: true,
        edit: true,
        delete: true,
        create: false
      }, movies: {
        view: true,
        edit: true,
        delete: false,
        create: false
      }
    }
  }
]

var movies = [
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
var members = [
  {
    id: 1,
    name: "George Clouny",
    email: "gc@gmail.com",
    city: "Los Angeles",
  }
]
var subscriptions = [{
  id: 1,
  memberId: 1,
  movies: [{ id: 3, watched: true }]
}]


export function MainContextProvider(props) {
    
  var permissionsReducer = useReducer(_permissionsReducer, permissions)

  useEffect(()=>{
    loadData();
  }, [users])


  return (
    <MainContext.Provider value={{ usersReducer, permissionsReducer }}>
      {props.children}
    </MainContext.Provider>
  )

  async function loadData(){
    
      users = await getUsers();

      let dispatch = usersReducer[1];
      dispatch({
        type: "CREATE",
        payload: users
      })

    return;
  }
}