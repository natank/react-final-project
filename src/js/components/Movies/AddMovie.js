import React, { useContext } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MoviesNav from './MoviesNav';
import MovieForm from './MovieForm';
import { MainContext } from '../../Context/main-context';
import { createMovie } from '../../Model/movie-model';

var useStyles = makeStyles(theme => ({
	addMovie: {
		minWidth: 300,
	},
}));

export default function AddMovie(props) {
	var { navIndex, setNavIndex } = props;
	var { store } = useContext(MainContext);
	var [state, dispatch] = store;
	var classes = useStyles();
	return (
		<Grid
			item
			container
			direction='column'
			xs={6}
			spacing={6}
			className={classes.addMovie}
			id='addMovie'>
			<Grid item xs={12} container alignItems='center' justify='center'>
				<MoviesNav navIndex={navIndex} setNavIndex={setNavIndex} />
			</Grid>
			<Grid item>
				<Typography variant='h4' align='center'>
					Add New Movie
				</Typography>

				<MovieForm actionText='Create' onSubmitCb={onCreateMovie} />
			</Grid>
		</Grid>
	);

	async function onCreateMovie(movieDetails) {
		var details = { ...movieDetails };
		details.generes = details.generes.split(',');
		var movie = await createMovie(details);
		dispatch({
			type: 'ADD_MOVIE',
			payload: { movie: { ...movie } },
		});
	}
}
