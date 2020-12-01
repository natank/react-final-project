import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { MembersManagementContextProvider } from '../Context/members-management-context';
import EditMember from '../components/Subscriptions/EditMember';
import MembersNav from '../components/Subscriptions/MembersNav';
import AllMembers from '../components/Subscriptions/AllMembers';
import AddMember from '../components/Subscriptions/AddMember';
import MemberUrlWrapper from '../components/Subscriptions/MemberUrlWrapper';
import PrivateRoute from '../components/Auth/PrivateRoute';

const useStyles = makeStyles({
	mainContainer: {
		width: '100%',
		margin: 0,
	},
});

export default function MembersManagement({ match }) {
	var classes = useStyles();

	return (
		<MembersManagementContextProvider match={match}>
			<Grid
				container
				direction='column'
				className={classes.mainContainer}
				alignItems='center'
				spacing={4}
				id='moviesContainer'>
				<Switch>
					<Route exact path={`${match.url}/edit/:id`}>
						<Typography component='h2' variant='h2' gutterBottom>
							Members
						</Typography>
						<PrivateRoute {...{ component: EditMember }} />
					</Route>
					<Route path={match.url}>
						<Grid item>
							<Typography component='h2' variant='h2'>
								Subscriptions
							</Typography>
						</Grid>
						<Route exact path={`${match.url}`} component={AllMembers} />
						<Switch>
							<Route exact path={`${match.url}/add`}>
								<PrivateRoute {...{ component: AddMember }} />
							</Route>
							<Route path={`${match.url}/:id`} component={MemberUrlWrapper} />
						</Switch>
					</Route>
				</Switch>
			</Grid>
		</MembersManagementContextProvider>
	);
}
