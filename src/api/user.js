import axios from "axios";

const api = process.env.REACT_APP_API_BASE_URL;

export const userInSessionApi = async () => {
  const { data } = await axios.get(`${api}/users`);
  return data;
};
