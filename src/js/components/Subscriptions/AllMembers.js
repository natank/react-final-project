import React, { useContext } from 'react';
import { Button, Grid, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import MemberDetails from './MemberDetails';
import { MainContext } from '../../Context/main-context';
import MembersNav from './MembersNav';
import { resetMembers } from '../../Model/member-model';

export default function AllMembers({ match, navIndex, setNavIndex }) {
	var { store } = useContext(MainContext);
	var [state, dispatch] = store;
	var user = state.authUser;

	var theme = useTheme();
	const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
	var { members } = state;

	return (
		<Grid
			item
			container
			direction='column'
			spacing={6}
			id='allMembersContainer'>
			<Grid
				item
				container
				spacing={3}
				alignItems='center'
				justify='center'
				id='memberMenuContainer'
				direction={matchesXS ? 'column' : 'row'}>
				<Grid item>
					<MembersNav
						match={match}
						navIndex={navIndex}
						setNavIndex={setNavIndex}
					/>
				</Grid>
				<Grid item>
					{user.admin ? (
						<Button
							variant='contained'
							onClick={onReset}
							style={{
								color: theme.palette.warning.contrastText,
								backgroundColor: theme.palette.warning.light,
							}}>
							Reset
						</Button>
					) : null}
				</Grid>
			</Grid>
			<Grid
				item
				container
				id='memberGridContainer'
				spacing={2}
				justify='center'
				>
				{members
					? members.map(function renderMember(member) {
							var props = { member, match };
							return (
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<MemberDetails {...props} />
							</Grid>
							);
					  })
					: null}
			</Grid>
		</Grid>
	);

	function onReset() {
		resetMembers();
	}
}
