
import axios from "axios";

const USER_API_URL = "http://localhost:5050/api/user/";

export const getUser = async () => {
  const result = await axios.get(USER_API_URL).then((res) => res);
  return result;
};

export const updateUser = (updatedObj) => {
  axios.put(USER_API_URL + updatedObj.id, updatedObj).then((res) => {
    console.log(res);
  });
};
