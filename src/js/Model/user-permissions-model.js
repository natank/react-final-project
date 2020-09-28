var usersPermissions = [
  {
    id: 1,
    userId: 3,
    userPermissions: {
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
    userPermissions: {
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
  }]

export async function getUsersPermissions() {
  return new Promise((resolve, reject) => {
    setTimeout(function resolveWithPermissions() {
      resolve(usersPermissions)
    }, 0)
  })
}

export async function updateUserPermissions(updatedUserPermissions) {
  if (!updatedUserPermissions.id) throw (new Error("Update user permissions failed: missing id"))
  let currentUserPermissions = usersPermissions.find(permissions => permissions.id == updatedUserPermissions.id);
  if (!currentUserPermissions) throw (new ReferenceError("Update user permissions failed: user permissions not found"))
  for (var key in updatedUserPermissions) {
    currentUserPermissions[key] = updatedUserPermissions[key]
  }
  return new Promise(function getUpdatedUser(resolve, reject) {
    setTimeout(function resolveUsersPermissions() { resolve(usersPermissions) }, 0)
  })
}

export async function deleteUserPermissions(id) {
  var updatedUsersPermissions = usersPermissions.filter(userPermissions => userPermissions.id !== id)
  return new Promise(function getListAfterDeleting(resolve, reject) {
    setTimeout(function resolveUsersPermissions() { resolve(updatedUsersPermissions) }, 0)
  })
}

export async function createUserPermissions(userPermissions, userId) {
  const id = usersPermissions.length == 0 ? 1 : usersPermissions[usersPermissions.length - 1].id + 1;
  userPermissions.id = id;
  userPermissions.userId = userId;
  usersPermissions = [...usersPermissions, userPermissions]
  return new Promise(function getUpdatedList(resolve, reject) {
    setTimeout(function resolveList() {
      resolve(usersPermissions)
    })
  })
}