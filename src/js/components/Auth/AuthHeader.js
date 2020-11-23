import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({

})

export default function AuthHeader() {

  const classes = useStyles()
  return (
    <Grid container direction="column" alignItems="center">
      <Typography component="h2" variant="h2" align="center">
        MovieNG
      </Typography>
    </Grid>
  )
}
