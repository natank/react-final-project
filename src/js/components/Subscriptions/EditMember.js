import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Typography, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { MainContext } from '../../Context/main-context';
import MemberForm from './MemberForm';
import { updateMember } from '../../Model/member-model';
import { compareItemId } from '../../Utils/utils';
import { MembersManagementContext } from '../../Context/members-management-context';

var useStyles = makeStyles(theme => ({
	title: {
		marginBottom: '1em',
	},
}));

export default function EditMember({navIndex, setNavIndex}) {
	
	var { store, membersManagementUrl } = useContext(MainContext);
	var [state, dispatch] = store;
	var match = useRouteMatch();
	var memberId = match.params.id;
	var { members } = state;

	var [componentState, setComponentState] = useState({
		redirect: false,
		updatedMemberDetails: {},
	});

	let editedMember = members.find(compareItemId(memberId));

	var history = useHistory();

	useEffect(() => {
		if (componentState.redirect)
			dispatch({
				type: 'UPDATE_MEMBER',
				payload: { member: { ...componentState.updatedMemberDetails } },
			});
	}, [componentState]);

	useEffect(() => {
		componentState.redirect && history.push(membersManagementUrl);
	});
	var classes = useStyles();
	return (
		<div>
			{editedMember ? (
				<div>
					<Typography variant='h5' className={classes.title} align='center'>
						Edit Member: {`${editedMember.name}`}
					</Typography>

					{editedMember ? (
						<MemberForm
							memberDetails={editedMember}
							actionText='Update'
							onSubmitCb={onUpdateMember}
							navIndex={navIndex} 
							setNavIndex={setNavIndex}
						/>
					) : null}
				</div>
			) : (
				<div>{null}</div>
			)}
		</div>
	);

	async function onUpdateMember(memberDetails) {
		var details = { ...memberDetails };
		var updatedMemberDetails = await updateMember(memberId, details);
		setComponentState({
			redirect: true,
			updatedMemberDetails,
		});
	}
}
