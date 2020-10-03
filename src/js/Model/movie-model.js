import { getItems, addItem, deleteItem, updateItem } from './utils'
var movies = [
  {
    id: 3,
    name: "Under the dome",
    generes: ["Genere1", "Genere2"],
    image: "https://via.placeholder.com/600/771796",
    premiered: "2014-12-03"
  },
  {
    id: 4,
    name: "Under the dome 2",
    generes: ["Genere1", "Genere2"],
    image: "https://via.placeholder.com/600/771796",
    premiered: "2019-10-09"
  },
  {
    id: 5,
    name: "Piano",
    generes: ["Genere1", "Genere2"],
    image: "https://via.placeholder.com/600/771796",
    premiered: "2019-10-09"
  }
]

export function getMovies() {
  return getItems(movies)
}

export function addMovie(newMovie) {
  return addItem(movies, newMovie)
}

export function deleteMovie(movieId) {
  return deleteItem(movies, movieId)
}

export function updateMovie(newMovie) {
  return updateItem(movies, newMovie)
}