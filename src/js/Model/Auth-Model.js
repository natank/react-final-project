import { firestore } from "../API/firebase";
import CreateAccount from "../components/Auth/CreateAccount";
import { collectIdsAndDocs } from "./utils";

export async function createAccount({ username, password }) {
  // check if username exist and free
  var docRef = await firestore.collection("users").where("userName", "==", username)
  var snapshot = await docRef.get()
  if (!snapshot.empty) {

    var user = collectIdsAndDocs(snapshot.docs[0])
    console.log(user)
  } else {
    console.log("snapshot is empty")
  }



}