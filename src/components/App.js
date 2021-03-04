import React, { useState, useEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { initialState, reducer } from "../store/reducer";
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
  const [curentUser, setCurentUser] = useState(1); // current user id
  const [isAuth, setIsAuth] = useState();
  const [movieList, setMovieList] = useState();

  const allUsers = UserService("user");

  const userChange = (value) => {
    // data index = value - 1
    setCurentUser(value);
  };

  useEffect(() => {
    setUsers(allUsers.data);
    users.forEach((i) => {
      if (i.id === curentUser) {
        setIsAuth(i.authenticated);
        setMovieList(i.favourite_movies.split(","));
      }
    });
  }, [allUsers, users, curentUser]);

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Container>
          <Account onChange={userChange} users={users} curUser={curentUser} />

          <h1>Favourite Movies</h1>

          <Grid container spacing={3}>
            <Grid item xs={3}>
              <MovieCard movies={movieList} />
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
