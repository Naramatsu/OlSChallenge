import axios from "axios";

const apiProject = process.env.REACT_APP_API_BASE_URL;
const apiWeather = process.env.REACT_APP_WEATHER_API_BASE_URL;

export const getDashboardApi = async () => {
  const { data } = await axios.get(`${apiProject}/dashboard_cards`);
  return data;
};

export const getCPUReportApi = async () => {
  const { data } = await axios.get(`${apiProject}/cpu_report`);
  return data;
};

export const getCommitsReportApi = async () => {
  const { data } = await axios.get(`${apiProject}/report_commits`);
  return data;
};

export const getWeatherApi = async (country) => {
  const { data } = await axios.get(`${apiWeather}/find`, {
    params: {
      q: "Bogota",
      appid: process.env.REACT_APP_WEATHER_API_KEY,
    },
  });
  return data;
};
