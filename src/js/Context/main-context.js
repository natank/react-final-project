import React, { useReducer, createContext, useEffect, useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getUsersPermissions } from '../Model/user-permissions-model'
import { getUsers } from '../Model/user-model'
import { getMovies } from '../Model/movie-model'
import { getMembers } from '../Model/member-model';

import { usersReducer, usersPermissionsReducer, moviesReducer, membersReducer } from '../Reducers/reducers'

export var MainContext = createContext();



export function MainContextProvider(props) {
  const initialState = { users: [], usersPermissions: [], movies: [], members: [] }
  const rootReducer = combineReducers({ users: usersReducer, usersPermissions: usersPermissionsReducer, movies: moviesReducer, members: membersReducer })

  const result = useReducer(rootReducer, initialState)
  const [state, dispatch] = result;
  const store = useMemo(() => [state, dispatch], [state])
  var match = useRouteMatch()


  var urls = {
    membersManagementUrl: `${match.url}/subscriptions`,
    moviesManagementUrl: `${match.url}/movies`
  }

  useEffect(() => {
    loadData();
  }, [])


  return (
    <MainContext.Provider value={{ store, ...urls }}>
      {props.children}
    </MainContext.Provider >
  )



  async function loadData() {

    var users = await getUsers();
    var usersPermissions = await getUsersPermissions();
    var movies = await getMovies();
    var members = await getMembers();

    dispatch({
      type: "LOAD",
      payload: { users, usersPermissions, movies, members }
    })

    return;
  }
}

const combineReducers = (slices) => (state, action) =>
  Object.keys(slices).reduce(
    (acc, prop) => ({
      ...acc,
      [prop]: slices[prop](acc[prop], action),
    }),
    state
  );