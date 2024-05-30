import axios from "axios";

const api = process.env.REACT_APP_API_BASE_URL;

export const getAllProjectsApi = async () => {
  const { data } = await axios.get(`${api}/projects`);
  return data;
};
