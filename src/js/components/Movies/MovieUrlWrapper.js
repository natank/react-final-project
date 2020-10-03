import React, { useContext } from 'react'
import { MainContext } from "../../Context/main-context"
import MovieDetails from './MovieDetails'

export default function MovieUrlWrapper({ match }) {
    var { moviesStore } = useContext(MainContext);

    var [moviesState, moviesDispatch] = moviesStore;
    var { movies } = moviesState;

    var movie = movies.find(movie => movie.id == match.params.id)

    return (
        <MovieDetails {...{ movie, match }} />
    )
}