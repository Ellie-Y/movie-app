export const initialState = {
  loading: true,
  users: [],
  movies: [],
  errorMessage: null,
};

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
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};
