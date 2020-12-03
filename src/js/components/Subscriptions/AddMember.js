import React, { useContext } from 'react';
import MembersNav from './MembersNav';
import MemberForm from './MemberForm';
import { MainContext } from '../../Context/main-context';
import { createMember } from '../../Model/member-model'
import {Typography, Grid} from '@material-ui/core'

export default function AddMember({navIndex, setNavIndex}) {
  var { store } = useContext(MainContext);
  var [state, dispatch] = store;

  return (
    <Grid item container direction="column" xs={6} spacing={6}>
      <Grid item xs={12} container alignItems="center" 
        justify="center">
        <MembersNav navIndex={navIndex} setNavIndex={setNavIndex}/>
      </Grid>
      <Grid item>
        <Typography 
            variant="h4"
            align="center"
        >
            Add New Member
        </Typography>
        <MemberForm actionText="Create" onSubmitCb={onCreateMember} navIndex={navIndex} setNavIndex={setNavIndex} />
      </Grid>
    </Grid>
  )


  async function onCreateMember(memberDetails) {
    var details = { ...memberDetails, movies: [] }
    var member = await createMember(details);
    dispatch({
      type: "ADD_MEMBER",
      payload: { member: { ...member } }
    })
  }
}
