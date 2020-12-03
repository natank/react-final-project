import React, { useContext } from 'react'
import { Grid} from '@material-ui/core'

import MemberDetails from './MemberDetails'
import { MainContext } from '../../Context/main-context'
import MembersNav from './MembersNav';

export default function AllMembers({ match, navIndex, setNavIndex }) {

  var { store } = useContext(MainContext)

  var [state, dispatch] = store;

  var { members } = state;

  return (
    <Grid item container
      direction="column"
      spacing={6}
      id="allMembersContainer"
    >
      <Grid item container
        alignItems="center"
        justify="center"
        id="memberMenuContainer"
      >
        <MembersNav match={match} navIndex={navIndex} setNavIndex={setNavIndex}/>
      </Grid>
      <Grid item container
        id="memberGridContainer"
        component="ul" spacing={2} justify="center"
      >
        {
          members ? members.map(function renderMember(member) {
            var props = { member, match }
            return (
              <Grid item key={member.id}
                xs={12} md={4} xl={3}
              >
                <MemberDetails {...props} />
              </Grid>
            )
          }) : null
        }
      </Grid>

    </Grid>
  )
}