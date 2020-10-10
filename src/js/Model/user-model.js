import Model from './Model'

var userModel = new Model({ collectionName: "users", docName: "user" })

export async function updateUser(id, userDetails) {
  return userModel.updateDoc(id, userDetails);
}

export async function createUser(newUser) {
  return userModel.createDoc(newUser)
}

export async function deleteUser(userId) {
  userModel.deleteDoc(userId)
}


export async function getUsers() {
  return userModel.getCollectionDocs()
}

