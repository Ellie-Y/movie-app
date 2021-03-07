const localApi = "http://localhost:5050/api/";

export const getUsers = async (param) => {
  const data = await fetch(localApi + param).then((res) => res.json());
  return data;
};
