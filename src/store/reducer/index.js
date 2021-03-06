import axios from "axios";

export const initialState = {
  loading: true,
  users: [],
  movies: [],
  errorMessage: null,
};

const USER_API_URL = "http://localhost:5050/api/";


export const reducer = (state, action) => {
  switch (action.type) {
    case "USER_REQUEST":
      return {
        ...state,
        users: action.payload,
      };
    case "LOAD_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case "UPDATE_MOVIE":
      const updatedObj = action.payload;
      axios
        .put(`http://localhost:5050/api/user/${updatedObj.id}`, updatedObj)
        .then((res) => {
          console.log(res);
        });
      return {
        ...state,
      };
    default:
      return state;
  }
};
