import React, { useState, useEffect, useReducer } from "react";
import { initialState, reducer } from "../store/reducer";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
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
  const [isAuth, setIsAuth] = useState(); // Authenticated user or not -> boolean
  const [allOtherMovies, setAllOtherMovies] = useState(); // other users' favourite movie
  const [movieList, setMovieList] = useState(); // current user's favourite movie
  const [, dispatch] = useReducer(reducer, initialState);

  const allUsers = UserService("user");
  useEffect(() => {
    let otherUsersMovies = [];
    setUsers(allUsers.data);
    allUsers.data.forEach((user) => {
      if (user.id === curUserId) {
        setIsAuth(user.authenticated);
      }
      if (!isAuth && user.id === curUserId) {
        // If user is not authenticated then only render their movies only
        setMovieList(user.favourite_movies.split(","));
      } else if (isAuth) {
        // Authenticated user can see all others' favourite movies but can't edit others
        if (user.id !== curUserId) {
          otherUsersMovies.push({
            name: user.firstName,
            movies: user.favourite_movies.split(","),
          });
        }
        setAllOtherMovies(otherUsersMovies);
      }
    });
  }, [allUsers, curUserId, isAuth]);

  /**
   * Switch user
   * @param {string} value current user id
   */
  const userChange = (value) => {
    setCurUserId(value);
  };

  // Enter to add a new movie by movie ID
  const handleChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newMovie = e.target.value;
      const isExist = movieList.includes(newMovie);
      if (!isExist) {
        setMovieList([newMovie, ...movieList]);
        updateDatabase(newMovie);
      } else {
        //TODO pop up alert to show movie existing already
      }
    }
  };

  function updateDatabase(newMovie) {
    const curUser = users[curUserId - 1];
    const newMovieList = {
      favourite_movies: [newMovie, ...movieList].toString(),
    };
    const updatedData = Object.assign(curUser, newMovieList);
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

          <h1>My Favourite Movies</h1>
          <MovieCard
            movies={movieList}
            allUsers={allUsers.data}
            userId={curUserId}
            auth={true}
          />
          {/* Authenticated user can see other users' movies but can't edit */}
          {isAuth && isAuth
            ? allOtherMovies &&
              allOtherMovies.map((i, index) => (
                <>
                  <h2>{`${i.name}'s favourite movies`}</h2>
                  <MovieCard
                    movies={i.movies}
                    allUsers={allUsers.data}
                    userId={curUserId}
                    key={index}
                    auth={false}
                  />
                </>
              ))
            : false}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
