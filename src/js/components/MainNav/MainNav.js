import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Link as NavLink } from '@material-ui/core'
import { MainContext } from '../../Context/main-context'
import { checkAccessToRoute } from '../../Utils/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  navLink: {
    color: "white"
  }
}));

function MainNav({ routes }) {
  var { store } = useContext(MainContext)
  var [state, dispatch] = store;
  var { authUser } = state
  var classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          {routes.map((elem, index) => getRoute(elem, index))}
          <Tab label="Logout" onClick={onLogout} label="Logout" />

        </Tabs>
      </AppBar>


    </div>

  )
  function onLogout(event) {
    event.preventDefault()
    dispatch({
      type: "LOGOUT_USER"
    })
  }



  function getRoute(route, key) {
    var isAuthorized = checkAccessToRoute(route.url, authUser)
    return (

      isAuthorized ?
        <Tab label={route.title} component={Link} to={route.url} />
        : null

    )
  }
}

export default MainNav;