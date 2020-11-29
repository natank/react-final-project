import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, CardHeader} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { MainContext } from '../../Context/main-context';
import { deleteMovie } from '../../Model/movie-model'
import MovieSubscriptions from './MovieSubscriptions'
import { checkAccessToRoute } from '../../Utils/utils'

const useStyles = makeStyles({
  movieCard:{
    width: "30%"
  }
})


export default function MovieDetails({ movie, match }) {
  var classes = useStyles();
  if (!movie) return null;
  
  var { store } = useContext(MainContext);
  var [state, dispatch] = store;
  var { authUser } = state


  var editMovieRoute = `${match.url}/edit/${movie.id}`
  var deleteMovieRoute = `${match.url}/delete/${movie.id}`
  var isUserAllowedToDelete = checkAccessToRoute(deleteMovieRoute, authUser)
  var isUserAllowedToEdit = checkAccessToRoute(editMovieRoute, authUser)
  return (
    <Card variant="outlined">
        <CardMedia 
          component="img"
          image={`${movie.image}`}
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`${movie.name}, ${(new Date(movie.premiered)).getFullYear()} `}
          </Typography>
          <Typography>{`Generes: ${movie.generes.map(genere => genere)}`}</Typography>
          <Typography>Subscriptions watched</Typography>
          <MovieSubscriptions movie={movie} />
  
          <CardActions>
            {isUserAllowedToEdit
              ? <Button component={Link} to={`${match.url}/edit/${movie.id}`}>
                  Edit
                </Button>
              : null
            }
            {isUserAllowedToDelete
              ? <Button onClick={onDeleteMovie}>Delete</Button>
              : null
            }
          </CardActions>




      </CardContent>
      
    </Card>)

  async function onDeleteMovie(event) {
    event.preventDefault();
    var movieId = movie.id;
    try {
      await deleteMovie(movie.id)
    } catch (err) {
      console.log(err)
    }
    dispatch({
      type: "REMOVE_MOVIE",
      payload: { movieId }
    })
  }

}