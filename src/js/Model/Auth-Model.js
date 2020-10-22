import { firestore } from "../API/firebase";
import CreateAccount from "../components/Auth/CreateAccount";
import { collectIdsAndDocs } from "./utils";

export async function createAccount({ username, password }) {


  var docRef = await firestore.collection("usersLogin").where("userName", "==", username)
  var snapshot = await docRef.get()

  if (snapshot.empty) {
    throw ("user not found")
  } else {
    var userDoc = snapshot.docs[0]
    var data = userDoc.data()
    if (data.password) {
      throw ("user already taken")
    }
    else {
      await firestore.collection("usersLogin")
        .doc(userDoc.id)
        .update({ ...userDoc.data, password })
    }
  }
  return
}

export async function loginUser({ username, password }) {
  var dataSnapshot = await getDataByUsername(username, firestore.collection("usersLogin"));

  var [data] = dataSnapshot.docs;
  var user = data.data()

  if (user.password !== password) {
    throw ("incorrect password")
  }
  dataSnapshot = await getDataByUsername(username, firestore.collection("users"))
  var [data] = dataSnapshot.docs;
  user = collectIdsAndDocs(data)
  var permissionsRef = await firestore.collection("usersPermissions").where("userId", "==", user.id)
  var permissionsSnapshot = await permissionsRef.get()

  var [permissionsData] = permissionsSnapshot.docs
  var permissions = permissionsData.data().userPermissions
  var admin = permissionsData.data().admin;

  return { ...user, permissions, admin }

}

async function getDataByUsername(username, collection) {

  var docRef = await collection.where("userName", "==", username)

  var snapshot = await docRef.get()

  if (snapshot.empty) {
    throw ("user not found")
  } else {
    return snapshot
  }
}