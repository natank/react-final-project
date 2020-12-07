import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {Typography, Box, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import { MainContext } from '../../Context/main-context'
import MovieForm from './MovieForm';
import { updateMovie } from '../../Model/movie-model'
import { compareItemId } from '../../Utils/utils'
import { MoviesManagementContext } from '../../Context/movies-management-context'

var useStyles = makeStyles(theme => ({
    title: {
        marginBottom: "1em"
    }
}))

export default function EditMovie({ match, navIndex, setNavIndex }) {
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
    var classes = useStyles();
    
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
        <Grid item>
            {editedMovie ?
                <Box>
                    <Typography 
                        variant="h4"
                        className={classes.title}>
                        Edit Movie: {`${editedMovie.name}`}
                    </Typography>
                    <MovieForm movieDetails={editedMovie} actionText="Update" onSubmitCb={onUpdateMovie} />
                </Box> : <div>{null}</div>
            }
        </Grid>
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



