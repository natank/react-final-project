import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { MainContext } from '../Context/main-context';
import { checkAccessToRoute } from '../Utils/utils';

export default function Home() {
	var { store } = useContext(MainContext);
	var [state, dispatch] = store;
	var { authUser } = state;
	return (
		<Container>
			<Grid container direction='column' alignItems='center' spacing={3}>
				<Grid item>
					<Typography variant='h2' style={{ textAlign: 'center' }}>
						Welcome to MovieNG
					</Typography>
				</Grid>
				<Grid item>
					<Typography>View, Edit, add or Delete Movies and Members</Typography>
				</Grid>
				<Grid item>
					<Typography>
						Subscribe members to watch their favorite movies
					</Typography>
				</Grid>
				<Grid item container justify='center' spacing={3}>
					<Grid item>
						<Button
							variant='contained'
							component={Link}
							to='/movies'
							disabled
							color='primary'>
							Manage Movies
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant='contained'
							color='primary'
							component={Link}
							to='/movies'
							disabled>
							Manage Subscriptions
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}
