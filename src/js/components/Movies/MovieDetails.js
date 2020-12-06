import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MainContext } from '../../Context/main-context';
import { deleteMovie } from '../../Model/movie-model';
import MovieSubscriptions from './MovieSubscriptions';
import { checkAccessToRoute } from '../../Utils/utils';

const useStyles = makeStyles({
	movieCard: {
		width: '30%',
	},
	movieTitle: {
		height: '60px',
	},
});

export default function MovieDetails({ movie, match }) {
	var classes = useStyles();
	if (!movie) return null;

	var { store } = useContext(MainContext);
	var [state, dispatch] = store;
	var { authUser } = state;

	var editMovieRoute = `${match.url}/edit/${movie.id}`;
	var deleteMovieRoute = `${match.url}/delete/${movie.id}`;
	var isUserAllowedToDelete = checkAccessToRoute(deleteMovieRoute, authUser);
	var isUserAllowedToEdit = checkAccessToRoute(editMovieRoute, authUser);
	return (
		<Card variant='outlined'>
			<Grid container>
				<Grid item xs={6}>
					<CardMedia component='img' image={`${movie.image}`} />
				</Grid>
				<Grid item xs={6}>
					<CardContent>
						<Typography
							gutterBottom
							variant='h5'
							component='h2'
							gutterBottom
							className={classes.movieTitle}>
							{`${movie.name}, ${new Date(movie.premiered).getFullYear()} `}
						</Typography>
						<Typography gutterBottom>{`Generes: ${movie.generes.map(
							genere => genere
						)}`}</Typography>
						<Typography variant='h6'>Subscriptions watched</Typography>
						<MovieSubscriptions movie={movie} />

						<CardActions>
							{isUserAllowedToEdit ? (
								<Button
									variant='contained'
									color='primary'
									component={Link}
									to={`${match.url}/edit/${movie.id}`}>
									Edit
								</Button>
							) : null}
							{isUserAllowedToDelete ? (
								<Button onClick={onDeleteMovie}>Delete</Button>
							) : null}
						</CardActions>
					</CardContent>
				</Grid>
			</Grid>
		</Card>
	);

	async function onDeleteMovie(event) {
		event.preventDefault();
		var movieId = movie.id;
		try {
			await deleteMovie(movie.id);
		} catch (err) {
			console.log(err);
		}
		dispatch({
			type: 'REMOVE_MOVIE',
			payload: { movieId },
		});
	}
}
