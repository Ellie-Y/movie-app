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

  const MOVIE_API_URL = (val) =>
    `http://www.omdbapi.com/?i=${val}&apikey=1b45329b`;

  useEffect(() => {
    let resList = [];
    props.movies &&
      props.movies.forEach((i) => {
        axios.get(MOVIE_API_URL(i)).then((json) => {
          resList.push(json.data);
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: resList,
          });
        });
      });
  }, [props]);

  const { movies } = state;
  return (
    <Grid container spacing={3}>
      {movies.map((i) => (
        <Grid item xs={3}>
          <SingleMovie movie={i} />
        </Grid>
      ))}
    </Grid>
  );
}

function SingleMovie(props) {
  return (
    <Card className='movie-card'>
      <CardActionArea>
        <CardMedia image={props.movie.Poster} title={props.movie.Title} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.movie.Title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            <div className='plot'>{props.movie.Plot}</div>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          VIEW
        </Button>
        <Button size='small' color='primary'>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}

export default MovieCard;
