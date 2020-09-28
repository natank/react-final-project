import { getItems, addItem, deleteItem } from './utils'

var subscriptions = [{
  id: 1,
  memberId: 1,
  movies: [
    { id: 3, watched: '1/1/2020' },
    { id: 4, watched: '2/2/2020' }
  ]
}]




export function getSubscriptions() {
  return getItems(subscriptions)
}

export function addSubscription(newSubscription) {
  return addItem(subscriptions, newSubscription)
}

export function deleteSubscription(subscriptionId) {
  return deleteItem(subscriptions, subscriptionId)
}

export function updateSubscription(userId, movie) {
  let subscription = subscriptions.find(subscription => subscription.userId == userId)
  if (!subscription) throw Error("Cannot add movie, subscription not found")
  subscription.movies = [...subscription.movies, movie]
}

