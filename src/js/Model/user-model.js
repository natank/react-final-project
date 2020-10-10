import { firestore } from '../API/firebase'
import { collectIdsAndDocs } from './utils'


export async function updateUser(id, userDetails) {
  if (!id) throw (new Error("Update user failed: missing id"))
  await firestore.collection('users').doc(id).update({
    ...userDetails
  })

  var doc = await firestore.collection("users").doc(id).get();
  var user = collectIdsAndDocs(doc)

  return user

}

export async function createUser(user) {
  const docRef = await firestore.collection('users').add(user)
  const doc = await docRef.get()

  const newItem = collectIdsAndDocs(doc);

  return newItem

}

export async function deleteUser(id) {
  await firestore.collection('users').doc(id).delete()
}


export async function getUsers() {
  const snapshot = await firestore.collection('users').get();
  var items = snapshot.docs.map(collectIdsAndDocs)

  return items;
}

