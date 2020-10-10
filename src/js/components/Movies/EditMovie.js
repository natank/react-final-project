import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { MainContext } from '../../Context/main-context'
import MovieForm from './MovieForm';
import { updateMovie } from '../../Model/movie-model'
import { compareItemId } from '../../Utils/utils'
import { MoviesManagementContext } from '../../Context/movies-management-context'

export default function EditMovie({ match }) {
    var { store } = useContext(MainContext);

    var [state, dispatch] = store;

    var movieId = match.params.id;

    var { movies } = state;

    var [componentState, setComponentState] = useState({
        redirect: false,
        updatedMovieDetails: {}
    })


    var editedMovie = movies.find(compareItemId(movieId))

    var { moviesManagementUrl } = useContext(MoviesManagementContext)
    var history = useHistory();

    useEffect(() => {
        if (componentState.redirect)
            dispatch({
                type: "UPDATE_MOVIE",
                payload: { movie: { ...componentState.updatedMovieDetails } }
            })
    }, [componentState])

    useEffect(() => {
        componentState.redirect && history.push(moviesManagementUrl)
    })


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
        var updatedMovieDetails = await updateMovie(movieId, details);
        setComponentState({
            redirect: true,
            updatedMovieDetails,
        })
    }
}



