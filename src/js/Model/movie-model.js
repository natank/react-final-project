import Model from './Model'

var movieModel = new Model({ collectionName: "movies", docName: "movie" })

export async function getMovies() {
  return movieModel.getCollectionDocs();
}

export async function createMovie(newMovie) {
  return movieModel.createDoc(newMovie)
}

export async function deleteMovie(movieId) {
  movieModel.deleteDoc(movieId)
}

export async function updateMovie(movieId, movieDetails) {
  return movieModel.updateDoc(movieId, movieDetails)
}