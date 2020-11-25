import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Tabs, Tab, Typography, useScrollTrigger, Button } from '@material-ui/core'
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
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    height: "7rem"
  },
  tabContainer: {
    marginLeft: 'auto'
  },
  tab: {
    marginLeft: "25px"
  },
  logoContainer: {
    textTransform: "none",
    color: theme.palette.secondary.contrastText,
    padding: "0 1rem",
    marginLeft: 0,
    backgroundColor: theme.palette.grey[900],
    height: "8em",
    "&:hover":{
      backgroundColor: theme.palette.grey[800]
    }
  }

}));

function MainNav(props) {
  const { routes } = props
  var { membersManagementUrl, moviesManagementUrl, usersManagementUrl, store } = useContext(MainContext)
  var [state, dispatch] = store;
  var { authUser } = state
  var classes = useStyles();
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    if(window.location.pathname === '/' && value !== 0) {
      setValue(0)
    }
    else if(window.location.pathname === moviesManagementUrl && value !== 1) {
      setValue(1)
    } else if(window.location.pathname === membersManagementUrl && value !==2){
      setValue(2)
    } else if(window.location.pathname === usersManagementUrl && value !=3){
      setValue(3)
    }
  })


  return (
    <React.Fragment>
      <ElevationScroll {...props} className={classes.root}>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            <Button component={Link} to='/' className = {classes.logoContainer} onClick={()=>setValue(0)}>
              <Typography variant="h4" align="center">
                MovieNG
              </Typography>
            </Button>
            
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
              className={classes.tabContainer}
              indicatorColor="primary"
            >
              {routes.map((elem, index) => getRoute(elem, index))}
              <Tab 
                className={classes.tab} 
                label="Logout" 
                onClick={onLogout} 
                label="Logout" 
              />
            </Tabs>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
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
        <Tab 
          key={key} 
          label={route.title} 
          component={Link} 
          to={route.url} 
          className={classes.tab}
        />
        : null

    )
  }
}

export default MainNav;