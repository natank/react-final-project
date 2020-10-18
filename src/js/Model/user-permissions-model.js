import Model from './Model'

var userPermissionsModel = new Model({
  collectionName: "usersPermissions",
  docName: "userPermissions"
})

export async function getUsersPermissions() {
  return userPermissionsModel.getCollectionDocs()
}

export async function updateUserPermissions(id, updatedUserPermissions) {
  return userPermissionsModel.updateDoc(id, updatedUserPermissions);
}

export async function deleteUserPermissions(id) {
  userPermissionsModel.deleteDoc(id)
}

export async function createUserPermissions(userPermissions, userId) {
  debugger
  var users = { view: false, create: false, edit: false, delete: false }
  userPermissions.userPermissions = { ...userPermissions.userPermissions, users }
  var data = { ...userPermissions };
  data.userId = userId;
  debugger
  return userPermissionsModel.createDoc(data)
}