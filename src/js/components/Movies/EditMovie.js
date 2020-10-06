import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { MainContext } from '../../Context/main-context'
import MovieForm from './MovieForm';
import { updateMovie } from '../../Model/movie-model'
import { compareItemId } from '../../Utils/utils'

export default function EditMovie({ match }) {
    var { store } = useContext(MainContext);
    var [state, dispatch] = store;
    var movieId = match.params.id;
    var { movies } = state;

    var editedMovie = movies.find(compareItemId(movieId))

    return (
        <div>
            {editedMovie ?
                <div>
                    <h2>Edit Movie: {`${editedMovie.firstName} ${editedMovie.lastName}`}</h2>
                    <MovieForm movieDetails={editedMovie} actionText="Update" onSubmitCb={onUpdateMovie} />
                </div> : <div>{null}</div>
            }
        </div>
    )

    async function onUpdateMovie(movieDetails) {
        var details = { ...movieDetails }
        details.generes = details.generes.split(',')
        var movies = await updateMovie(details);
        dispatch({
            type: "LOAD",
            payload: { ...state, movies: [...movies] }
        })
    }
}



