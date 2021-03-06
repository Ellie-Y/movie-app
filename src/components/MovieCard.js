import React, { useState, useEffect, useReducer } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { initialState, reducer } from "../store/reducer";
import axios from "axios";

function MovieCard(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Render all the movies
  const MOVIE_API_URL = (val) =>
    `http://www.omdbapi.com/?i=${val}&apikey=1b45329b`;
  useEffect(() => {
    let resList = [];
    props.movies &&
      props.movies.forEach((i) => {
        axios.get(MOVIE_API_URL(i)).then((json) => {
          resList.push(json.data);
          dispatch({
            type: "LOAD_MOVIES_SUCCESS",
            payload: resList,
          });
        });
      });
  }, [props.movies]);

  const { movies } = state;

  const onCardClick = (i) => {
    dispatch({
      type: "DELETE_MOVIE",
      payload: {
        movieId: i,
        allUsers: props.allUsers,
        userId: props.userId,
        movieList: props.movies,
      },
    });
  };

  return (
    <Grid container spacing={3}>
      {movies.map((val, i) => (
        <Grid item xs={3} key={i}>
          <SingleMovie movie={val} clicked={onCardClick} />
        </Grid>
      ))}
    </Grid>
  );
}

function SingleMovie(props) {
  // Pass the imdbID to parent component for remove
  const handleClick = () => {
    props.clicked(props.movie.imdbID);
  };

  return (
    <Card className='movie-card'>
      <CardActionArea>
        <CardMedia image={props.movie.Poster} title={props.movie.Title} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.movie.Title}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className='plot'>
            {props.movie.Plot}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          VIEW
        </Button>
        <Button size='small' color='primary' onClick={handleClick}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}

export default MovieCard;
