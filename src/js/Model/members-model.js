import { getItems, addItem, updateItem, deleteItem } from './utils'



var members = [
  {
    id: 1,
    name: "George Clouny",
    email: "gc1@gmail.com",
    city: "Los Angeles",
    movies: [
      { movieId: 1, date: "2015-12-01" },
      { movieId: 2, date: "2018-11-2 1" },
    ]
  }
]
export async function getMembers() {
  return getItems(members, 0)
}

export async function addMember(newMember) {
  return addItem(members, newMember)
}

export async function updateMember(memberDetails) {
  return updateItem(members, memberDetails)
}

export async function deleteMember(memberId) {
  return deleteItem(members, memberId)
}
