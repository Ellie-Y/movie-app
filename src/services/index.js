const ApiKey = "1b45329b";
const localApi = "http://localhost:5050/api/";
const omdbApi = "http://www.omdbapi.com/";

export const getMovie = async (id) => {
  const data = await fetch(`${omdbApi}?i=${id}&apikey=${ApiKey}`).then((res) =>
    res.json()
  );
  return data;
};

export const getUsers = async (param) => {
  const data = await fetch(localApi + param).then((res) => res.json());
  return data;
};
