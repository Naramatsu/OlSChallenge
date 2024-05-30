import axios from "axios";

const api = process.env.REACT_APP_API_BASE_URL;

export const loginApi = async ({ user, password }) => {
  const { data } = await axios.get(`${api}/login`, {
    params: {
      user,
      password,
    },
  });
  return data;
};
