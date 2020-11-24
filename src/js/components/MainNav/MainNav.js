import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Tabs, Tab, Typography, useScrollTrigger } from '@material-ui/core'
import { MainContext } from '../../Context/main-context'
import { checkAccessToRoute } from '../../Utils/utils'

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  navLink: {
    color: "white"
  }
}));

function MainNav(props) {
  const { routes } = props
  var { store } = useContext(MainContext)
  var [state, dispatch] = store;
  var { authUser } = state
  var classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <ElevationScroll {...props} className={classes.root}>
        <AppBar position="fixed" >
          <Toolbar disableGutters>
            <Typography component="h5" variant="h5" align="center">
              MovieNG
            </Typography>
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              {routes.map((elem, index) => getRoute(elem, index))}
              <Tab label="Logout" onClick={onLogout} label="Logout" />
            </Tabs>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
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