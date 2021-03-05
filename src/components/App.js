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

const USER_API_URL = "http://localhost:5050/api/";
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

  const handleChange = () => {};

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Container>
          <header>
            <form>
              <TextField
                id='standard-basic'
                label='Add movie by ID'
                value={""}
                onChange={handleChange}
              />
            </form>
            <Account onChange={userChange} users={users} curUser={curUserId} />
          </header>

          <h1>Favourite Movies</h1>
          <MovieCard movies={movieList} userId={curUserId} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
