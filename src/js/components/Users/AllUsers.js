import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import UserDetails from './UserDetails'
import { MainContext } from '../../Context/main-context'
import UsersNav from './UsersNav';
import { Grid} from '@material-ui/core'

function AllUsers({ match }) {

  var { store } = useContext(MainContext)

  var [state, dispatch] = store;

  var { users, usersPermissions } = state

  return (
    <Grid item container
      direction="column"
      spacing={6}
      id="allUsersContainer"
    >
      <Grid item container
        alignItems="center"
        justify="center"
        id="usersMenuContainer"
      >
        <UsersNav match={match} />
      </Grid>
      <Grid item container
        id="userGridContainer"
        component="ul" spacing={2} justify="center"
      >
        {
          users ? users.map(function renderUser(user) {
            if (!user.id) return null
            let userPermissions = usersPermissions.find(permissions => permissions.userId == user.id)
            if (!userPermissions) return null
            return (
              <Grid item key={user.id}
                    xs={12} md={4} xl={3}
              >
                <UserDetails userPermissions={userPermissions.userPermissions} user={user} match={match} />
              </Grid>
            )
          }) : null
        }
      </Grid>
    </Grid>
  )
}

export default AllUsers