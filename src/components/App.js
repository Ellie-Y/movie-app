import React, { useState, useEffect, useReducer } from "react";
import { initialState, reducer } from "../store/reducer";
import axios from "axios";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Account from "./Account";
import MovieCard from "./MovieCard";
import UserService from "../services/hooks";

import "../App.scss";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#ed8d8d",
      dark: "#282c34",
      contrastText: "#fff",
    },
  },
});

function App() {
  const [users, setUsers] = useState([]); // get all the users from database
  const [curUserId, setCurUserId] = useState(1); // current user id
  const [isAuth, setIsAuth] = useState();
  const [movieList, setMovieList] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);

  const allUsers = UserService("user");

  useEffect(() => {
    setUsers(allUsers.data);
    allUsers.data.forEach((i) => {
      if (i.id === curUserId) {
        setIsAuth(i.authenticated);
        setMovieList(i.favourite_movies.split(","));
      }
    });
  }, [allUsers, curUserId]);

  const userChange = (value) => {
    // data index = value - 1
    setCurUserId(value);
  };

  const handleChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newMovie = e.target.value;
      const isExist = movieList.includes(newMovie);
      if (!isExist) {
        setMovieList([newMovie, ...movieList]);
        updateDatabase(newMovie);
      } else {
        //TODO pop up shows exist already
      }
    }
  };

  function updateDatabase(newMovie) {
    const curUser = users[curUserId - 1];
    const newMovieList = {
      favourite_movies: [newMovie, ...movieList].toString(),
    };
    const updatedData = Object.assign(curUser, newMovieList);
    //TODO 新 ID插入数据库
    dispatch({
      type: "UPDATE_MOVIE",
      payload: updatedData,
    });
  }

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Container>
          <header>
            <form>
              <TextField
                id='standard-basic'
                label='Add movie by ID'
                onKeyPress={handleChange}
              />
            </form>
            <Account onChange={userChange} users={users} curUser={curUserId} />
          </header>

          <h1>Favourite Movies</h1>
          <MovieCard
            movies={movieList}
            allUsers={allUsers.data}
            userId={curUserId}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
