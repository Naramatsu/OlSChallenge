import React, { useReducer } from "react";
import Reducer from "./reducer";
import { DashboardContext } from ".";
import { NOT_LOADED } from "../../utils/constants";
import {
  CPU_REPORT,
  CPU_REPORT_ERROR,
  CPU_REPORT_LOADING,
  DASHBOARD,
  DASHBOARD_ERROR,
  DASHBOARD_LOADING,
  WEATHER,
  WEATHER_ERROR,
  WEATHER_LOADING,
} from "./types";
import {
  getCPUReportApi,
  getDashboardApi,
  getWeatherApi,
} from "../../api/dashboard";
import { getCelsiusDeg, isDayOrNight } from "../../utils";

const DashboardState = ({ children }) => {
  const initialState = {
    dashboardInfo: null,
    dashboardStatus: NOT_LOADED,
    dashboardErrorMessage: "",
    weatherInfo: null,
    weatherStatus: NOT_LOADED,
    weatherErrorMessage: "",
    cpuReport: null,
    cpuReportStatus: NOT_LOADED,
    cpuReportErrorMessage: "",
  };
  const [globalState, dispatch] = useReducer(Reducer, initialState);

  const getDashboardInfo = async () => {
    dispatch({
      type: DASHBOARD_LOADING,
    });
    try {
      const data = await getDashboardApi();
      if (!data) return null;

      dispatch({
        type: DASHBOARD,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DASHBOARD_ERROR,
        payload: error.message,
      });
    }
  };

  const getCPUReport = async () => {
    dispatch({
      type: CPU_REPORT_LOADING,
    });
    try {
      const data = await getCPUReportApi();
      if (!data) return null;

      dispatch({
        type: CPU_REPORT,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CPU_REPORT_ERROR,
        payload: error.message,
      });
    }
  };

  const getWeather = async (country) => {
    dispatch({
      type: WEATHER_LOADING,
    });
    try {
      const data = await getWeatherApi(country);
      if (!data) return null;
      const { list } = data;

      const deg = list[0].main.temp;
      const weather = list[0].weather[0].main;

      const payload = {
        time: isDayOrNight(),
        temp: getCelsiusDeg(deg),
        weather,
      };

      dispatch({
        type: WEATHER,
        payload,
      });
    } catch (error) {
      dispatch({
        type: WEATHER_ERROR,
        payload: error.message,
      });
    }
  };

  const combinedFunctions = {
    getDashboardInfo,
    getCPUReport,
    getWeather,
  };

  return (
    <DashboardContext.Provider value={{ ...globalState, ...combinedFunctions }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
