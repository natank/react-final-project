import Model from './Model';
import initMovies from '../API/tvmaze';

var movieModel = new Model({ collectionName: 'movies', docName: 'movie' });

export async function getMovies() {
	return movieModel.getCollectionDocs();
}

export async function createMovie(newMovie) {
	return movieModel.createDoc(newMovie);
}

export async function deleteMovie(movieId) {
	movieModel.deleteDoc(movieId);
}

export async function updateMovie(movieId, movieDetails) {
	return movieModel.updateDoc(movieId, movieDetails);
}

export async function resetMovies() {
	var movies = initMovies.slice(0, 20).map(movie => {
		return {
			generes: movie.genres,
			image: movie.image.medium,
			name: movie.name,
			premiered: movie.premiered,
		};
	});
	movieModel.createDocs(movies);
}
