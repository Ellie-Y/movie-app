import axios from "axios";

export const initialState = {
  users: {},
  movies: [],
};
const USER_API_URL = "http://localhost:5050/api/user/";

const updateDatabase = (updatedObj) => {
  axios
    .put(`http://localhost:5050/api/user/${updatedObj.id}`, updatedObj)
    .then((res) => {
      console.log(res);
    });
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_MOVIES_SUCCESS":
      return {
        ...state,
        movies: action.payload,
      };
    case "UPDATE_MOVIE":
      const updatedObj = action.payload;
      updateDatabase(updatedObj);
      return {
        ...state,
      };
    case "DELETE_MOVIE":
      // TODO real time delete
      const { userId, movieId, allUsers, movieList } = action.payload;
      // Get current user data
      const curUser = allUsers.find(i => i.id === userId ? i : false);
      const newList = movieList.filter((i) => i !== movieId);
      const newMovieData = {
        favourite_movies: newList.toString(),
      };
      const updatedData = Object.assign(curUser, newMovieData);
      updateDatabase(updatedData);
      return {
        ...state,
        newList,
      };
    default:
      return state;
  }
};
