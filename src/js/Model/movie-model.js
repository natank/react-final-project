import { firestore } from '../API/firebase';
import { collectIdsAndDocs } from './utils'

export async function getMovies() {
  var snapshot = await firestore.collection('movies').get();
  var items = snapshot.docs.map(collectIdsAndDocs)
  return items
}

export async function createMovie(movie) {
  const docRef = await firestore.collection('movies').add(movie)
  const doc = await docRef.get()
  return collectIdsAndDocs(doc)
}

export async function deleteMovie(id) {
  await firestore.collection('movies').doc(id).delete()
}

export async function updateMovie(id, newMovie) {
  if (!id) throw (new Error("Update movie failed: missing id"))
  await firestore.collection('movies').doc(id).update({ ...newMovie })
  var doc = await firestore.collection("movies").doc(id).get()
  var movie = collectIdsAndDocs(doc);
  return movie
}