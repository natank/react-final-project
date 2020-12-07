import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
	Grid,
	Card,
	CardActions,
	CardContent,
	Button,
	Typography,
	useMediaQuery,
} from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import MemberSubscriptions from './MemberSubscriptions';
import SubscriptionForm from './SubscriptionForm';
import { MainContext } from '../../Context/main-context';
import { checkAccessToRoute } from '../../Utils/utils';

import { deleteMember, updateMember } from '../../Model/member-model';

var useStyles = makeStyles(theme => ({
	memberCard: {
		height: 350,
		width: "100%",
	},
}));

export default function MemberDetails({ member, match }) {
	if (!member) return null;

	var { store, membersManagementUrl } = useContext(MainContext);
	var [state, dispatch] = store;
	var { authUser } = state;
	var [subscriptionFormActive, setSubscriptionsFormActive] = useState(false);
	var [memberDetails, setMemberDetails] = useState({ ...member });

	var memberId = memberDetails.id;

	var editRoute = `${match.url}/edit/${memberId}`;
	var deleteRoute = `${match.url}/delete/${memberId}`;
	var isUserAllowedToDelete = checkAccessToRoute(deleteRoute, authUser);
	var isUserAllowedToEdit = checkAccessToRoute(editRoute, authUser);
	var classes = useStyles();

	var theme = useTheme();
	const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

	return (

			<Card variant='outlined' className={classes.memberCard}>
				<CardContent>
					{/**Card */}
					<Grid container spacing={1} direction='column'>
						{/**Name and Email */}
						<Grid item container xs={12}>
							{/**Name */}
							<Grid item xs={12}>
								<Typography variant='h5' component='h2'>
									{memberDetails.name}
								</Typography>
							</Grid>

							{/**member email */}
							<Grid item xs={12}>
								<Button
									color='primary'
									target='_top'
									rel='noopener noreferrer'
									href={`mailto:${memberDetails.email}`}>
									<Typography
										variant='button'
										style={{ fontSize: '1em', textTransform: 'lowercase' }}>
										{memberDetails.email}
									</Typography>
								</Button>
							</Grid>
						</Grid>
						{/**Card actions, Edit, delete, subscribe */}
						<Grid item>
							<CardActions style={{ padding: 0 }}>
								{/**Edit button */}
								{isUserAllowedToEdit ? (
									<Button
										variant='outlined'
										component={Link}
										to={`${match.url}/edit/${memberDetails.id}`}
										size={matchesXS ? 'small' : 'medium'}>
										Edit
									</Button>
								) : null}
								{/**Delete button */}
								{isUserAllowedToDelete ? (
									<Button
										variant='outlined'
										onClick={onDeleteMember}
										size={matchesXS ? 'small' : 'medium'}>
										{' '}
										Delete
									</Button>
								) : null}
								{/**Sbuscribe button */}
								<Button
									variant='outlined'
									onClick={onSubscribeClick}
									size={matchesXS ? 'small' : 'medium'}>
									Subscribe
								</Button>
							</CardActions>
						</Grid>

						{subscriptionFormActive ? (
							<Grid item xs={12}>
								<SubscriptionForm
									{...{ memberDetails, onFormCancel, onSubscription }}
								/>
							</Grid>
						) : (
							<Grid item>
								<Typography component='h5' variant='h6'>
									Movies Watched
								</Typography>
								<MemberSubscriptions member={memberDetails} />
							</Grid>
						)}
					</Grid>
				</CardContent>
			</Card>

	);

	function onSubscribeClick(event) {
		event.preventDefault();
		// Toggle the active flag
		setSubscriptionsFormActive(!subscriptionFormActive);
	}

	function onFormCancel(event) {
		event.preventDefault();
		setSubscriptionsFormActive(false);
	}

	async function onSubscription(subscriptionDetails) {
		var { movieId, date } = subscriptionDetails;
		var movies = [...memberDetails.movies, { movieId, date }];
		var updatedDetails = { ...member, movies };
		var updatedMemberDetails = await updateMember(memberId, updatedDetails);
		setMemberDetails(updatedMemberDetails);
		// dispatch({
		// 	type: 'UPDATE_MEMBER',
		// 	payload: { member: updatedMemberDetails },
		// });
	}

	async function onDeleteMember(event) {
		event.preventDefault();
		var memberId = memberDetails.id;
		try {
			await deleteMember(memberDetails.id);
		} catch (err) {
			console.log(err);
		}
		dispatch({
			type: 'REMOVE_MEMBER',
			payload: { memberId },
		});
	}
}
