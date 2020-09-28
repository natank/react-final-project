

export var usersReducer = (function usersRducer() {
  return reducer("users")
})()

export var usersPermissionsReducer = (function usersPermissionsReducer() {
  return reducer("usersPermissions")
})()


export var moviesReducer = (function moviesReducer() {
  return reducer("movies")
})()

export var subscriptionsReducer = (function subscriptionsReducer() {
  return reducer("subscriptions")
})()

export var membersReducer = (function membersReducer() {
  return reducer("members")
})()

function reducer(collectionName) {
  return function collectionReducer(state, action) {
    switch (action.type) {
      case "LOAD":
        var items = {}
        items[collectionName] = [...action.payload[collectionName]]
        return items;
    }
  }
}