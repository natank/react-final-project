import { firestore } from '../API/firebase'
import { collectIdsAndDocs } from '../Utils/utils'

var users = [
  {
    id: 1,
    firstName: "Abraham",
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

]



export async function updateUser(userDetails) {
  if (!userDetails.id) throw (new Error("Update user failed: missing id"))

  let user = users.find(user => user.id == userDetails.id);
  if (!user) throw (new ReferenceError("Update user failed: user not found"))
  for (var key in userDetails) {
    user[key] = userDetails[key]
  }
  return new Promise(function getUpdatedUser(resolve, reject) {
    setTimeout(function resolveUpdatedUser() { resolve(users) }, 0)
  })
}

export async function createUser(user) {
  const docRef = await firestore.collection('users').add(user)
  const doc = await docRef.get()

  const newUser = collectIdsAndDocs(doc);

  return newUser

  var id = users.length == 0 ? 1 : users[users.length - 1].id + 1;
  user.id = id
  users = [...users, user]
  return new Promise(function getUpdatedUsers(resolve, reject) {
    setTimeout(function resolveUpdatedUsersList() {
      resolve({ users, id })
    })
  })
}

export async function deleteUser(id) {
  users = users.filter(user => user.id !== id)
  return new Promise(function getListAfterDeleting(resolve, reject) {
    setTimeout(function resolveUsers() { resolve(users) }, 0)
  })
}


export async function getUsers() {
  const snapshot = await firestore.collection('users').get();
  var users = snapshot.docs.map(collectIdsAndDocs)

  return users;
}

