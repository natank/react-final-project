import { getItems, addItem, updateItem, deleteItem } from './utils'



var members = [
  {
    id: 1,
    name: "George Clouny",
    email: "gc1@gmail.com",
    city: "Los Angeles",
    movies: [
      { movieId: 3, date: "2015-12-01" },
      { movieId: 4, date: "2018-11-21" },
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

export async function addMemberSubscription(subscriptionDetails) {
  var { memberId, movieId, date } = subscriptionDetails;
  var member = members.find(currMember => currMember.id == memberId);
  member.movies = [...member.movies, { movieId, date }]
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([...members])
    }, 0)
  })
}