import { updateUser } from "../../services";
export const initialState = {
  users: {},
  movies: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_USERS":
      return {
        ...state,
        movies: action.payload,
      };
    case "LOAD_MOVIES":
      return {
        ...state,
        movies: action.payload,
      };
    case "UPDATE_MOVIE":
      const updatedObj = action.payload;
      updateUser(updatedObj);
      return {
        ...state,
      };
    case "DELETE_MOVIE":
      const { userId, movieId, allUsers, movieList } = action.payload;
      // Get current user data
      const curUser = allUsers.find((i) => (i.id === userId ? i : false));
      const newList = movieList.filter((i) => i !== movieId);
      const newMovieData = {
        favourite_movies: newList.toString(),
      };
      const updatedData = Object.assign(curUser, newMovieData);
      updateUser(updatedData);
      return {
        ...state,
        newList,
      };
    default:
      return state;
  }
};
