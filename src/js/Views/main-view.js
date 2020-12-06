import React, { useContext } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useRouteMatch,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { MainContext } from '../Context/main-context';
import { Container } from '@material-ui/core';

import SubscriptionsManagementView from './subscriptions-management-view';
import UsersManagementView from './users-management-view';
import MoviesManagementView from './movies-management-view';
import MainNav from '../components/MainNav';
import Home from '../components/Home';

import PrivateRoute from '../components/Auth/PrivateRoute';
var useStyles = makeStyles(theme => ({
	root: {
		padding: 0,
		[theme.breakpoints.up('sm')]: {
			padding: '1rem',
		},
	},
}));
function MainView() {
	var {
		membersManagementUrl,
		moviesManagementUrl,
		usersManagementUrl,
	} = useContext(MainContext);

	const match = useRouteMatch();
	const mainRoutes = [
		{
			title: 'Home',
			url: '/',
		},
		{
			title: 'Movies',
			url: moviesManagementUrl,
		},
		{
			title: 'Subscriptions',
			url: membersManagementUrl,
		},
		{
			title: 'Users Management',
			url: usersManagementUrl,
		},
	];
	var classes = useStyles();

	return (
		<Container id='siteContainer' className={classes.root} maxWidth={false}>
			<MainNav routes={mainRoutes} />
			<Switch>
				<Route path={moviesManagementUrl}>
					<PrivateRoute {...{ component: MoviesManagementView }} />
				</Route>
				<Route path={membersManagementUrl}>
					<PrivateRoute {...{ component: SubscriptionsManagementView }} />
				</Route>
				<Route path={usersManagementUrl}>
					<PrivateRoute {...{ component: UsersManagementView }}></PrivateRoute>
				</Route>
				<Route exact path={'/'} component={Home} />
			</Switch>
		</Container>
	);
}

export default function Main(props) {
	return <MainView />;
}
