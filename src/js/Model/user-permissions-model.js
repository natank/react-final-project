import { firestore } from '../API/firebase'
import { collectIdsAndDocs } from './utils'

export async function getUsersPermissions() {
  const snapshot = await firestore.collection('usersPermissions').get();
  var items = snapshot.docs.map(collectIdsAndDocs)

  return items;
}

export async function updateUserPermissions(id, updatedUserPermissions) {
  if (!id) throw (new Error("Update user permissions failed: missing id"))
  await firestore.collection('usersPermissions').doc(id).update({
    ...updatedUserPermissions
  })

  var doc = await firestore.collection("usersPermissions").doc(id).get();
  var userPermissions = collectIdsAndDocs(doc)

  return userPermissions
}

export async function deleteUserPermissions(id) {
  await firestore.collection('usersPermissions').doc(id).delete()
}

export async function createUserPermissions(userPermissions, userId) {
  var data = { ...userPermissions };
  data.userId = userId;
  const docRef = await firestore.collection('usersPermissions').add(data);
  var doc = await docRef.get();
  var newUserPermissions = collectIdsAndDocs(doc);
  return newUserPermissions;
}