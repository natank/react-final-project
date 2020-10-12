import Model from './Model'
import { firestore } from "../API/firebase";
import { collectIdsAndDocs } from './utils';

var userLoginModel = new Model({ collectionName: "usersLogin", docName: "userLogin" })

export async function updateUserLogin(id, userDetails) {
  return userLoginModel.updateDoc(id, userDetails);
}

export async function createUserLogin(newUser) {
  return userLoginModel.createDoc(newUser)
}

export async function deleteUserLogin(userId) {
  var user = await firestore.collection("users").doc(userId)
  var userName = user.userName;
  debugger
  await deleteUserLoginByUsername(userName)

  userLoginModel.deleteDoc(userId)
}

export async function deleteUserLoginByUsername(username) {
  var docref = await firestore.collection("usersLogin").where("username", "==", username)
  var snapshot = await docref.get();
  if (!snapshot.empty) {
    var userLogin = collectIdsAndDocs(snapshot.docs[0])
    deleteUserLogin(userLogin.id)
  }
}
