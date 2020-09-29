import React, { useReducer, createContext, useEffect, useState } from 'react';
import { getUsersPermissions } from '../Model/user-permissions-model'
import { getUsers } from '../Model/user-model'
import { getMovies } from '../Model/movie-model'
import { getMembers } from '../Model/member-model';
import { getSubscriptions } from '../Model/subscriptions-model';
import * as reducers from '../Reducers/reducers'

var { usersReducer, usersPermissionsReducer, moviesReducer, membersReducer, subscriptionsReducer } = reducers;

export var MainContext = createContext();


export function MainContextProvider(props) {

  var usersPermissionsStore = useReducer(usersPermissionsReducer, { usersPermissions: [] })
  var usersStore = useReducer(usersReducer, { users: [] })
  var moviesStore = useReducer(moviesReducer, { movies: [] })
  var subscriptionsStore = useReducer(subscriptionsReducer, { subscriptions: [] })
  var membersStore = useReducer(membersReducer, { members: [] })


  useEffect(() => {
    loadData();
  }, [])


  return (
    <MainContext.Provider value={{ usersStore, usersPermissionsStore, moviesStore, subscriptionsStore, membersStore }}>
      {props.children}
    </MainContext.Provider>
  )



  async function loadData() {

    var users = await getUsers();
    var usersPermissions = await getUsersPermissions();
    var movies = await getMovies();
    var members = await getMembers();
    var subscriptions = await getSubscriptions()

    var usersDispatch = usersStore[1];
    var usersPermissionsDispatch = usersPermissionsStore[1];
    var moviesDispatch = moviesStore[1];
    var membersDispatch = membersStore[1];
    var subscriptionsDispatch = subscriptionsStore[1];

    usersDispatch({
      type: "LOAD",
      payload: { users }
    })

    usersPermissionsDispatch({
      type: "LOAD",
      payload: { usersPermissions }
    })

    moviesDispatch({
      type: "LOAD",
      payload: { movies }
    })
    membersDispatch({
      type: "LOAD",
      payload: { members }
    })

    subscriptionsDispatch({
      type: "LOAD",
      payload: { subscriptions }
    })

    return;
  }
}