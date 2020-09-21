import { reject } from "lodash";

var users = [
  {
    id: 1,
    firstName: "Avi",
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
    setTimeout(function resolveUpdatedUser() { resolve({ ...user }) }, 0)
  })
}

export async function createUser(user) {

}

export async function deleteUser(id) {

}


export async function getUsers() {

}