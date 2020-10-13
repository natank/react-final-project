import { firestore } from "../API/firebase";
import CreateAccount from "../components/Auth/CreateAccount";
import { collectIdsAndDocs } from "./utils";

export async function createAccount({ username, password }) {


  var docRef = await firestore.collection("usersLogin").where("username", "==", username)
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